import React, { useEffect, useState, useRef } from 'react';
import useFetch, { isNotStarted, FetchState, hasData, FetchStatus, hasFinished } from '../../hooks/useFetch';
import useForm from 'react-hook-form';
import { valideringsSkjema } from './valideringsSkjema';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { AlertStripeHjelper } from '../../utils/alertstripe-utils';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import PanelBase from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import OpplysningeneErFeil from './tilleggssporsmal/OpplysningeneErFeil';
import ArbeidsgiverSporsmal from './tilleggssporsmal/ArbeidsgiverSporsmal';
import FrilanserSporsmal from './tilleggssporsmal/FrilanserSporsmal';
import AvbrytDialog from './AvbrytDialog';
import tekster from './sporsmal-tekster';
import AnnenArbeidsgiver from './AnnenArbeidsgiver';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { skalViseFrilansersporsmal } from '../../utils/sporsmal-utils';
import Arbeidsgiver from '../../types/arbeidsgiverTypes';
import FormSubmitKnapp from './FormSubmitKnapp';
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
    frilanserEgenmelding?: string;
    frilanserForsikring?: string;
}

interface SporsmalProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

const Sporsmal: React.FC<SporsmalProps> = ({ sykmelding, arbeidsgivere, sykmeldingUtenforVentetid }: SporsmalProps) => {
    const { register, handleSubmit, watch, errors, formState } = useForm({
        validationSchema: valideringsSkjema,
    });
    const sendSykmelding = useFetch<any>();
    const bekreftSykmelding = useFetch<any>();
    const avbrytSykmelding = useFetch<any>();

    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);

    const avbrytdialogRef = useRef<HTMLDivElement>(document.createElement('div'));

    // For conditional visning av underspørsmål og alertbokser
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
        // TODO: Sjekk om sykmeldingen skal sendes eller bekreftes
        if (isNotStarted(sendSykmelding)) {
            sendSykmelding.fetch('/syforest/sendSykmelding', { method: 'POST' }, (fetchState: FetchState<any>) => {
                console.log(fetchState.data);
                // TODO: Redirect til kvitteringsside
            });
        }
    };

    const onAvbryt = () => {
        console.log('avbryter sykmelding');
        avbrytSykmelding.fetch(
            `/syforest/sykmeldinger/${sykmelding.id}/actions/avbryt`,
            undefined,
            (fetchState: FetchState<any>) => {
                // TODO: Redirect til ...
            },
        );
    };

    return (
        <>
            <AlertStripeHjelper
                vis={formState.isSubmitted && !formState.isValid}
                type="feil"
                tekst={tekster['alertstripe.feil-i-utfyllingen.tekst']}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <PanelBase className="panelbase">
                    <SkjemaGruppe
                        feil={
                            errors.opplysningeneErRiktige
                                ? { feilmelding: tekster['jaEllerNei.feilmelding'] }
                                : undefined
                        }
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
                    <OpplysningeneErFeil
                        vis={watchOpplysningeneErRiktige === 'false'}
                        register={register}
                        errors={errors}
                    />
                    <AlertStripeHjelper
                        vis={watchPeriode || watchSykmeldingsgrad}
                        type="advarsel"
                        tittel={tekster['alertstripe.du-trenger-ny-sykmelding.tittel']}
                        tekst={tekster['alertstripe.du-trenger-ny-sykmelding.tekst']}
                    />
                    <AlertStripeHjelper
                        vis={!(watchPeriode || watchSykmeldingsgrad) && watchArbeidsgiver}
                        type="info"
                        tittel={tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}
                        tekst={tekster['alertstripe.du-kan-bruke-sykmeldingen.arbeidsgiver.tekst']}
                    />
                    <AlertStripeHjelper
                        vis={
                            !(watchPeriode || watchSykmeldingsgrad || watchArbeidsgiver) &&
                            (watchDiagnose || watchAndreOpplysninger)
                        }
                        type="info"
                        tittel={tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}
                        tekst={tekster['alertstripe.du-kan-bruke-sykmeldingen.tekst']}
                    />
                </PanelBase>
                {watchOpplysningeneErRiktige && !watchPeriode && !watchSykmeldingsgrad && (
                    <PanelBase className="panelbase">
                        <SkjemaGruppe
                            feil={errors.sykmeldtFra ? { feilmelding: tekster['sykmeldtFra.feilmelding'] } : undefined}
                        >
                            <Fieldset
                                legend={
                                    <div>
                                        {tekster['sykmeldtFra.tittel']}
                                        <Hjelpetekst>{tekster['sykmeldtFra.hjelpetekst']}</Hjelpetekst>
                                    </div>
                                }
                            >
                                {arbeidsgivere.map((arbeidsgiver, index) => (
                                    <Radio
                                        key={index}
                                        label={arbeidsgiver.navn + ` (Org. nummer:${arbeidsgiver.orgnummer})`}
                                        name="sykmeldtFra"
                                        value={Arbeidsforhold.ARBEIDSGIVER.concat(arbeidsgiver.orgnummer)}
                                        radioRef={register as any}
                                    ></Radio>
                                ))}
                                <Radio
                                    label={sykmelding.arbeidsgiver.navn}
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
                            <AlertStripeHjelper
                                vis={!!sykmelding.arbeidsgiver.navn}
                                type="info"
                                tekst={`Den som sykmeldte deg har oppgitt at du er sykmeldt fra ${sykmelding.arbeidsgiver.navn}`}
                            />
                        </SkjemaGruppe>
                        <ArbeidsgiverSporsmal
                            vis={watchSykmeldtFra === Arbeidsforhold.ARBEIDSGIVER}
                            register={register}
                            errors={errors}
                            watchOppfolging={watchOppfolging}
                        />
                        <FrilanserSporsmal
                            vis={
                                (watchSykmeldtFra === Arbeidsforhold.FRILANSER ||
                                    watchSykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE) &&
                                skalViseFrilansersporsmal(sykmelding, sykmeldingUtenforVentetid)
                            }
                            register={register}
                            errors={errors}
                        />
                        <AnnenArbeidsgiver vis={watchSykmeldtFra === Arbeidsforhold.ANNEN_ARBEIDSGIVER} />
                    </PanelBase>
                )}
                <FormSubmitKnapp
                    visAvbryt={watchPeriode || watchSykmeldingsgrad}
                    onAvbryt={onAvbryt}
                    visSubmitSpinner={
                        sendSykmelding.status === FetchStatus.PENDING ||
                        bekreftSykmelding.status === FetchStatus.PENDING
                    }
                    visAvbrytSpinner={avbrytSykmelding.status === FetchStatus.PENDING}
                    watchSykmeldtFra={watchSykmeldtFra}
                />
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
            <AvbrytDialog
                vis={visAvbrytDialog}
                visSpinner={avbrytSykmelding.status === FetchStatus.PENDING}
                onAvbryt={onAvbryt}
                setVisAvbrytDialog={setVisAvbrytDialog}
            />
        </>
    );
};

export default Sporsmal;
