import React, { useEffect, useState, useRef } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { AlertStripeFeil, AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import useForm from 'react-hook-form';
import { valideringsSkjema } from './valideringsSkjema';
import useFetch, { isNotStarted, FetchState, hasData, FetchStatus, hasFinished } from '../../hooks/useFetch';
import tekster from './sporsmal-tekster';
import { endreLedetekst } from '../../utils/ledetekst-utils';
import './Sporsmal.less';
import { Element, Normaltekst } from 'nav-frontend-typografi';

export enum Arbeidsforhold {
    ARBEIDSGIVER = 'arbeidsgiver',
    SELSTENDIG_NARINGSDRIVENDE = 'selvstendigNaringsdrivende',
    FRILANSER = 'frilanser',
    ANNEN_ARBEIDSGIVER = 'annenArbeidsgiver',
    ARBEIDSLEDIG = 'arbeidsledig',
    INGENTING_PASSER = 'ingentingPasser',
}

interface SykmeldingFormData {
    opplysningeneErRiktige?: string;
    periode?: boolean;
    sykmeldingsGrad?: boolean;
    arbeidsgiver?: boolean;
    diagnose?: boolean;
    andreOpplysninger?: boolean;
    sykmeldtFra?: Arbeidsforhold;
    oppfolging?: string;
    frilanserEgenmelding?: string;
    frilanserForsikring?: string;
}

const Sporsmal: React.FC = () => {
    const { register, handleSubmit, watch, errors, formState } = useForm({
        validationSchema: valideringsSkjema,
    });
    const sykmeldingPoster = useFetch<any>(); // Posting av form-data
    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);

    const avbrytdialogRef = useRef<HTMLDivElement>(document.createElement('div'));

    // For conditional visning av underspørsmål
    const watchOpplysningeneErRiktige = watch('opplysningeneErRiktige');
    const watchSykmeldtFra = watch('sykmeldtFra');
    const watchOppfolging = watch('oppfolging');
    const watchPeriode = watch('periode');
    const watchSykmeldingsgrad = watch('sykmeldingsgrad');
    const watchArbeidsgiver = watch('arbeidsgiver');
    const watchDiagnose = watch('diagnose');
    const watchAndreOpplysninger = watch('andreOpplysninger');

    const onSubmit = (data: SykmeldingFormData) => {
        console.log(data);
        if (isNotStarted(sykmeldingPoster)) {
            sykmeldingPoster.fetch('/syforest/sendSykmelding', { method: 'POST' }, (fetchState: FetchState<any>) => {
                if (hasData(fetchState)) {
                    console.log(fetchState.data);
                }
            });
        }
    };

    useEffect(() => {
        console.table(errors);
    }, [errors]);

    useEffect(() => {
        if (hasFinished(sykmeldingPoster)) {
            console.log('Innsending fullført');
            // TODO: Redirect til kvitteringside
        }
    }, [sykmeldingPoster]);

    return (
        <>
            {formState.isSubmitted && !formState.isValid && (
                <AlertStripeFeil>{tekster['alertstripe.tekst']}</AlertStripeFeil>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <PanelBase>
                    <SkjemaGruppe
                        feil={
                            errors.opplysningeneErRiktige
                                ? { feilmelding: tekster['jaEllerNei.feilmelding'] }
                                : undefined
                        }
                        className="js-opplysningeneErRiktige"
                    >
                        <Fieldset legend={tekster['jaEllerNei.tittel']}>
                            <Radio
                                label={tekster['ja']}
                                name="opplysningeneErRiktige"
                                value="true"
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['nei']}
                                name="opplysningeneErRiktige"
                                value="false"
                                radioRef={register as any}
                            />
                        </Fieldset>
                    </SkjemaGruppe>
                    {watchOpplysningeneErRiktige === 'false' && (
                        <SkjemaGruppe
                            feil={
                                errors.opplysninger
                                    ? { feilmelding: tekster['opplysningeneErFeil.feilmelding'] }
                                    : undefined
                            }
                            className="skjemagruppe--undersporsmal"
                        >
                            <Fieldset legend={tekster['opplysningeneErFeil.tittel']}>
                                <Checkbox
                                    label={tekster['opplysningeneErFeil.periode']}
                                    name="periode"
                                    checkboxRef={register as any}
                                />
                                <Checkbox
                                    label={tekster['opplysningeneErFeil.sykmeldingsgrad']}
                                    name="sykmeldingsgrad"
                                    checkboxRef={register as any}
                                />
                                <Checkbox
                                    label={tekster['opplysningeneErFeil.arbeidsgiver']}
                                    name="arbeidsgiver"
                                    checkboxRef={register as any}
                                />
                                <Checkbox
                                    label={tekster['opplysningeneErFeil.diagnose']}
                                    name="diagnose"
                                    checkboxRef={register as any}
                                />
                                <Checkbox
                                    label={tekster['opplysningeneErFeil.andreOpplysninger']}
                                    name="andreOpplysninger"
                                    checkboxRef={register as any}
                                />
                            </Fieldset>
                        </SkjemaGruppe>
                    )}
                    {(watchPeriode || watchSykmeldingsgrad) && (
                        <AlertStripeAdvarsel>
                            <Element>Du trenger ny sykmelding</Element>
                            <Normaltekst>
                                Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny.
                            </Normaltekst>
                        </AlertStripeAdvarsel>
                    )}
                    {!(watchPeriode || watchSykmeldingsgrad) &&
                        (watchDiagnose || watchArbeidsgiver || watchAndreOpplysninger) && (
                            <AlertStripeInfo>
                                <Element>Du kan bruke sykmeldingen din</Element>
                                <Normaltekst>
                                    Du velger hvilken arbeidsgiver sykmeldingen skal sendes til i neste spørsmål. Obs!
                                    Arbeidsgiveren som står i sykmeldingen fra før endres ikke, og vil være synlig for
                                    arbeidsgiveren du sender sykmeldingen til. Får du flere sykmeldinger må du gi
                                    beskjed til den som sykmelder deg om at det er lagt inn feil arbeidsgiver.
                                </Normaltekst>
                            </AlertStripeInfo>
                        )}
                </PanelBase>
                <br />
                <PanelBase>
                    <SkjemaGruppe
                        feil={errors.sykmeldtFra ? { feilmelding: tekster['sykmeldtFra.feilmelding'] } : undefined}
                        className="js-sykmeldtFra"
                    >
                        <Fieldset
                            legend={
                                <div>
                                    {tekster['sykmeldtFra.tittel']}
                                    <Hjelpetekst>{tekster['sykmeldtFra.hjelpetekst']}</Hjelpetekst>
                                </div>
                            }
                        >
                            <Radio
                                label="PLACEHOLDE arbeidsgiver"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ARBEIDSGIVER}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['sykmeldtFra.selvstending-naringsdrivende']}
                                name="sykmeldtFra"
                                value={Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['sykmeldtFra.frilanser']}
                                name="sykmeldtFra"
                                value={Arbeidsforhold.FRILANSER}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['sykmeldtFra.annen-arbeidsgiver']}
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ANNEN_ARBEIDSGIVER}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['sykmeldtFra.arbeidsledig']}
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ARBEIDSLEDIG}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['sykmeldtFra.ingenting-passer']}
                                name="sykmeldtFra"
                                value={Arbeidsforhold.INGENTING_PASSER}
                                radioRef={register as any}
                            />
                        </Fieldset>
                    </SkjemaGruppe>
                    {watchSykmeldtFra === 'arbeidsgiver' && (
                        <SkjemaGruppe
                            feil={
                                errors.oppfolging
                                    ? {
                                          feilmelding: endreLedetekst(
                                              tekster['sykmeldtFra.arbeidsgiver.bekreft.feilmelding'],
                                              {
                                                  '%ARBEIDSGIVER%': 'PLACEHOLDER',
                                              },
                                          ),
                                      }
                                    : undefined
                            }
                            className="skjemagruppe--undersporsmal"
                        >
                            <Fieldset
                                legend={endreLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.tittel'], {
                                    '%ARBEIDSGIVER%': 'PLACEHOLDER',
                                })}
                            >
                                <Radio
                                    label={tekster['ja']}
                                    name="oppfolging"
                                    value="true"
                                    radioRef={register as any}
                                />
                                <Radio
                                    label={tekster['nei']}
                                    name="oppfolging"
                                    value="false"
                                    radioRef={register as any}
                                />
                            </Fieldset>
                            {watchOppfolging === 'true' && (
                                <Tekstomrade>
                                    {endreLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.ja'], {
                                        '%ARBEIDSGIVER%': 'PLACEHOLDER',
                                    })}
                                </Tekstomrade>
                            )}
                            {watchOppfolging === 'false' && (
                                <Tekstomrade>{tekster['sykmeldtFra.arbeidsgiver.bekreft.nei']}</Tekstomrade>
                            )}
                        </SkjemaGruppe>
                    )}
                    {(watchSykmeldtFra === Arbeidsforhold.FRILANSER ||
                        watchSykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE) && (
                        <>
                            <SkjemaGruppe
                                feil={
                                    errors.frilanserEgenmelding
                                        ? { feilmelding: 'Velg om du har hatt egenmelding' }
                                        : undefined
                                }
                                className="skjemagruppe--undersporsmal"
                            >
                                <Fieldset legend={tekster['frilanser.egenmelding.tittel']}>
                                    <Radio
                                        label={tekster['ja']}
                                        name="frilanserEgenmelding"
                                        value="true"
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['nei']}
                                        name="frilanserEgenmelding"
                                        value="false"
                                        radioRef={register as any}
                                    />
                                </Fieldset>
                            </SkjemaGruppe>
                            <SkjemaGruppe
                                feil={
                                    errors.frilanserForsikring
                                        ? { feilmelding: 'Velg om du har hatt forsikring' }
                                        : undefined
                                }
                                className="skjemagruppe--undersporsmal"
                            >
                                <Fieldset legend={tekster['frilanser.forsikring.tittel']}>
                                    <Radio
                                        label={tekster['ja']}
                                        name="frilanserForsikring"
                                        value="true"
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['nei']}
                                        name="frilanserForsikring"
                                        value="false"
                                        radioRef={register as any}
                                    />
                                </Fieldset>
                            </SkjemaGruppe>
                        </>
                    )}
                    {watchSykmeldtFra === Arbeidsforhold.ANNEN_ARBEIDSGIVER && (
                        <div>Her k ommer det en komponent for å skrive ut sykmeldingen</div>
                    )}
                </PanelBase>
                <br />
                <Tekstomrade>placeholder for "Slik ser sykmeldingen ut for arbeidsgiveren din"</Tekstomrade>
                <br />
                <div className="knapp--sentrer">
                    <Hovedknapp htmlType="submit" spinner={sykmeldingPoster.status === FetchStatus.PENDING}>
                        {tekster['knapp.submit']}
                    </Hovedknapp>
                </div>
            </form>
            <div className="knapp--sentrer" ref={avbrytdialogRef}>
                <Lenke
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        setVisAvbrytDialog(vises => !vises);
                        setTimeout(
                            () => window.scrollTo({ top: avbrytdialogRef.current.offsetTop, behavior: 'smooth' }),
                            300,
                        );
                    }}
                    className="knapp--ikke-bruk-sykmeldingen"
                >
                    {tekster['knapp.onsker-ikke-bruke-sykmelding']}
                </Lenke>
            </div>
            {visAvbrytDialog && (
                <PanelBase className="avbrytdialog">
                    <Tekstomrade className="avbrytdialog--margin-bottom">
                        {tekster['avbrytdialog.er-du-sikker']}
                    </Tekstomrade>
                    <Tekstomrade className="avbrytdialog--margin-bottom">
                        {tekster['avbrytdialog.kan-sende-papir']}
                    </Tekstomrade>
                    <Fareknapp htmlType="button" className="avbrytdialog--margin-bottom">
                        {tekster['avbrytdialog.avbryt-knapp']}
                    </Fareknapp>
                    <Lenke
                        href="_blank"
                        onClick={e => {
                            e.preventDefault();
                            setVisAvbrytDialog(navarendeVerdi => !navarendeVerdi);
                        }}
                    >
                        {tekster['avbrytdialog.angre-knapp']}
                    </Lenke>
                </PanelBase>
            )}
        </>
    );
};

export default Sporsmal;
