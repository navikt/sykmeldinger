import React, { useState, useRef, useEffect } from 'react';
import useFetch, { isNotStarted, FetchState, FetchStatus } from '../../hooks/useFetch';
import useForm from 'react-hook-form';
import { valideringsSkjema } from './valideringsSkjema';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { AlertStripeHjelper } from '../../utils/alertstripe-utils';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import PanelBase from 'nav-frontend-paneler';
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
import Vis from '../../utils/vis';
import './Sporsmal.less';
import { getLedetekst } from '../../utils/ledetekst-utils';

export enum Arbeidsforhold {
    ARBEIDSGIVER = 'arbeidsgiver',
    SELSTENDIG_NARINGSDRIVENDE = 'selvstendigNaringsdrivende',
    FRILANSER = 'frilanser',
    ANNEN_ARBEIDSGIVER = 'annenArbeidsgiver',
    ARBEIDSLEDIG = 'arbeidsledig',
    INGENTING_PASSER = 'ingentingPasser',
}

export enum JaEllerNei {
    JA = 'ja',
    NEI = 'nei',
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

const Sporsmal = ({ sykmelding, arbeidsgivere, sykmeldingUtenforVentetid }: SporsmalProps) => {
    const { register, unregister, handleSubmit, watch, errors, formState, setValue, triggerValidation } = useForm({
        validationSchema: valideringsSkjema,
    });
    const sendSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const bekreftSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const avbrytSykmelding = useFetch<any>(); // TODO: Oppdater return type

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
    const watchFrilanserEgenmelding = watch('frilanserEgenmelding');

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

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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
                                value={JaEllerNei.JA}
                                radioRef={register as any}
                            />
                            <Radio
                                label={tekster['nei']}
                                name="opplysningeneErRiktige"
                                value={JaEllerNei.NEI}
                                radioRef={register as any}
                            />
                        </Fieldset>
                    </SkjemaGruppe>
                    <OpplysningeneErFeil
                        vis={watchOpplysningeneErRiktige === JaEllerNei.NEI}
                        visAlertstripeAvbryt={watchPeriode || watchSykmeldingsgrad}
                        visAlertstripeBrukArbeidsgiver={!(watchPeriode || watchSykmeldingsgrad) && watchArbeidsgiver}
                        visAlertstripeBruk={
                            !(watchPeriode || watchSykmeldingsgrad || watchArbeidsgiver) &&
                            (watchDiagnose || watchAndreOpplysninger)
                        }
                        register={register}
                        errors={errors}
                    />
                </PanelBase>
                <Vis
                    hvis={
                        watchOpplysningeneErRiktige === JaEllerNei.JA ||
                        (!watchPeriode &&
                            !watchSykmeldingsgrad &&
                            (watchArbeidsgiver || watchDiagnose || watchAndreOpplysninger))
                    }
                >
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
                                        value={Arbeidsforhold.ARBEIDSGIVER.concat('-', arbeidsgiver.orgnummer)}
                                        radioRef={register as any}
                                    ></Radio>
                                ))}
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
                                tekst={getLedetekst(tekster['sykmeldtFra.sykmelders-svar'], {
                                    '%ARBEIDSGIVER%': sykmelding.arbeidsgiver.navn,
                                })}
                            />
                        </SkjemaGruppe>
                        <ArbeidsgiverSporsmal
                            vis={new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra)}
                            arbeidsgiver={arbeidsgivere.find(arbeidsgiver =>
                                new RegExp(arbeidsgiver.orgnummer).test(watchSykmeldtFra),
                            )}
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
                            unregister={unregister}
                            errors={errors}
                            setValue={setValue}
                            triggerValidation={triggerValidation}
                            isSubmitted={formState.isSubmitted}
                            watchFrilanserEgemelding={watchFrilanserEgenmelding}
                        />
                        <AnnenArbeidsgiver vis={watchSykmeldtFra === Arbeidsforhold.ANNEN_ARBEIDSGIVER} />
                    </PanelBase>
                </Vis>
                <FormSubmitKnapp
                    visAvbryt={watchOpplysningeneErRiktige === JaEllerNei.NEI && (watchPeriode || watchSykmeldingsgrad)}
                    onAvbryt={onAvbryt}
                    avbrytdialogRef={avbrytdialogRef}
                    setVisAvbrytdialog={setVisAvbrytDialog}
                    visSubmitSpinner={
                        sendSykmelding.status === FetchStatus.PENDING ||
                        bekreftSykmelding.status === FetchStatus.PENDING
                    }
                    visAvbrytSpinner={avbrytSykmelding.status === FetchStatus.PENDING}
                    watchSykmeldtFra={watchSykmeldtFra}
                />
            </form>

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
