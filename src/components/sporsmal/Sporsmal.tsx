import React, { useEffect, useState, useRef } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp, Fareknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import useForm from 'react-hook-form';
import { valideringsSkjema } from './valideringsSkjema';
import useFetch, { isNotStarted, FetchState, hasData, FetchStatus, hasFinished } from '../../hooks/useFetch';
import './Sporsmal.less';

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
}

const Sporsmal: React.FC = () => {
    const { register, handleSubmit, watch, errors, formState } = useForm({
        validationSchema: valideringsSkjema,
    }); // Form-håndtering/validering
    const sykmeldingPoster = useFetch<any>(); // Posting av form-data
    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);

    const avbrytdialogRef = useRef<HTMLDivElement>(document.createElement('div'));

    // For conditional visning av underspørsmål
    const watchOpplysningeneErRiktige = watch('opplysningeneErRiktige');
    const watchSykmeldtFra = watch('sykmeldtFra');
    const watchOppfolging = watch('oppfolging');

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
            console.log('Sending was successful');
            // TODO: Redirect til kvitteringside
        }
    }, [sykmeldingPoster]);

    return (
        <>
            {formState.isSubmitted && !formState.isValid && (
                <AlertStripeFeil>Vennligst fyll ut alle feltene under.</AlertStripeFeil>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <PanelBase>
                    <SkjemaGruppe
                        feil={
                            errors.opplysningeneErRiktige ? { feilmelding: 'Vennligst velg Ja eller Nei' } : undefined
                        }
                        className="js-opplysningeneErRiktige"
                    >
                        <Fieldset legend="Er opplysningene i sykmeldingen riktige?">
                            <Radio label="Ja" name="opplysningeneErRiktige" value="true" radioRef={register as any} />
                            <Radio label="Nei" name="opplysningeneErRiktige" value="false" radioRef={register as any} />
                        </Fieldset>
                    </SkjemaGruppe>
                    {watchOpplysningeneErRiktige === 'false' && (
                        <SkjemaGruppe
                            feil={
                                errors.opplysninger
                                    ? { feilmelding: 'Vennligst velg ett eller flere alternativ' }
                                    : undefined
                            }
                            className="skjemagruppe--undersporsmal"
                        >
                            <Fieldset legend="Hva er som ikke stemmer?">
                                <Checkbox label="Periode" name="periode" checkboxRef={register as any} />
                                <Checkbox
                                    label="Sykmeldingsgrad"
                                    name="sykmeldingsgrad"
                                    checkboxRef={register as any}
                                />
                                <Checkbox label="Arbeidsgiver" name="arbeidsgiver" checkboxRef={register as any} />
                                <Checkbox label="Diagnose" name="diagnose" checkboxRef={register as any} />
                                <Checkbox
                                    label="Andre opplysninger"
                                    name="andreOpplysninger"
                                    checkboxRef={register as any}
                                />
                            </Fieldset>
                        </SkjemaGruppe>
                    )}
                </PanelBase>
                <br />
                <PanelBase>
                    <SkjemaGruppe
                        feil={errors.sykmeldtFra ? { feilmelding: 'Velg hvor du er sykmeldt fra' } : undefined}
                        className="js-sykmeldtFra"
                    >
                        <Fieldset
                            legend={
                                <div>
                                    Jeg er sykmeldt fra
                                    <Hjelpetekst>
                                        Er du sykmeldt fra flere arbeidssituasjoner må du ha én sykmelding per
                                        arbeidssituasjon. Trenger du flere sykmeldinger, må du kontakte den som har
                                        sykmeldt deg.
                                    </Hjelpetekst>
                                </div>
                            }
                        >
                            <Radio
                                label="Liste med arbeidsgivere"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ARBEIDSGIVER}
                                radioRef={register as any}
                            />
                            <Radio
                                label="Jobb som selstendig næringsdrivende"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE}
                                radioRef={register as any}
                            />
                            <Radio
                                label="Jobb som frilanser"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.FRILANSER}
                                radioRef={register as any}
                            />
                            <Radio
                                label="Jobb hos en annen arbeidsgiver"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ANNEN_ARBEIDSGIVER}
                                radioRef={register as any}
                            />
                            <Radio
                                label="Jeg er arbeidsledig"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.ARBEIDSLEDIG}
                                radioRef={register as any}
                            />
                            <Radio
                                label="Jeg finner ingenting som passer for meg"
                                name="sykmeldtFra"
                                value={Arbeidsforhold.INGENTING_PASSER}
                                radioRef={register as any}
                            />
                        </Fieldset>
                    </SkjemaGruppe>
                    {watchSykmeldtFra === 'arbeidsgiver' && (
                        <SkjemaGruppe
                            feil={errors.oppfolging ? { feilmelding: 'Velg hvor du er sykmeldt fra' } : undefined}
                            className="skjemagruppe--undersporsmal"
                        >
                            <Fieldset legend="Stemmer det at du får oppfølging av .... ?">
                                <Radio label="Ja" name="oppfolging" value="true" radioRef={register as any} />
                                <Radio label="Nei" name="oppfolging" value="false" radioRef={register as any} />
                            </Fieldset>
                            {watchOppfolging === 'true' && (
                                <Tekstomrade>
                                    Vi sender sykmeldingen til Station Officer Steele, som finner den ved å logge inn på
                                    nav.no.
                                </Tekstomrade>
                            )}
                            {watchOppfolging === 'false' && (
                                <Tekstomrade>
                                    Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                                </Tekstomrade>
                            )}
                        </SkjemaGruppe>
                    )}
                    {watchSykmeldtFra === 'frilanser' && (
                        <SkjemaGruppe
                            feil={errors.frilanser ? { feilmelding: 'Velg frilanser stuff' } : undefined}
                            className="skjemagruppe--undersporsmal"
                        >
                            <Fieldset legend="Frilanserspørsmål">
                                <Radio
                                    label="jeg er frilanser hallooo"
                                    name="frilanser"
                                    value="true"
                                    radioRef={register as any}
                                />
                                <Radio label="Nei" name="frilanser" value="false" radioRef={register as any} />
                            </Fieldset>
                        </SkjemaGruppe>
                    )}
                    {watchSykmeldtFra === 'annenArbeidsgiver' && (
                        <div>Her kommer det en komponent for å skrive ut sykmeldingen</div>
                    )}
                </PanelBase>
                <br />
                <Tekstomrade>placeholder for "Slik ser sykmeldingen ut for arbeidsgiveren din"</Tekstomrade>
                <br />
                <div className="knapp--sentrer">
                    <Hovedknapp htmlType="submit" spinner={sykmeldingPoster.status === FetchStatus.PENDING}>
                        SEND SYKMELDINGEN
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
                    Jeg ønsker ikke å bruke denne sykmeldingen
                </Lenke>
            </div>
            {visAvbrytDialog && (
                <PanelBase className="avbrytdialog">
                    <Tekstomrade className="avbrytdialog--margin-bottom">
                        Er du sikker på at du vil avbryte denne sykmeldingen?
                    </Tekstomrade>
                    <Tekstomrade className="avbrytdialog--margin-bottom">
                        Du kan fortsatt levere den på papir.
                    </Tekstomrade>
                    <Fareknapp htmlType="button" className="avbrytdialog--margin-bottom">
                        JA, JEG ER SIKKER
                    </Fareknapp>
                    <Lenke
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            setVisAvbrytDialog(vises => !vises);
                        }}
                    >
                        Angre
                    </Lenke>
                </PanelBase>
            )}
        </>
    );
};

export default Sporsmal;
