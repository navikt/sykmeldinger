import React, { useState, useRef, useEffect } from 'react';
import useFetch, { isNotStarted, FetchState, FetchStatus } from '../../../../hooks/useFetch';
import useForm, { FormContext } from 'react-hook-form';
import { skjemavalidering } from './valideringsSkjema';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { AlertStripeHjelper } from '../../../../utils/alertstripe-utils';
import PanelBase from 'nav-frontend-paneler';
import OpplysningeneErFeil from './tilleggssporsmal/OpplysningeneErFeil';
import ArbeidsgiverSporsmal from './tilleggssporsmal/ArbeidsgiverSporsmal';
import FrilanserSporsmal from './tilleggssporsmal/FrilanserSporsmal';
import AvbrytDialog from './AvbrytDialog';
import tekster from './Sporsmal-tekster';
import AnnenArbeidsgiver from './AnnenArbeidsgiver';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import { skalViseFrilansersporsmal } from '../../../../utils/sporsmal-utils';
import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import FormSubmitKnapp from './FormSubmitKnapp';
import Vis from '../../../../utils/vis';
import './Sporsmal.less';
import { getLedetekst } from '../../../../utils/ledetekst-utils';
import { Arbeidsforhold, JaEllerNei, Skjemafelt } from '../../../../types/sporsmalTypes';
import HjelpetekstWrapper from '../../../../components/hjelpetekst/HjelpetekstWrapper';

interface SporsmalProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

const Sporsmal = ({ sykmelding, arbeidsgivere, sykmeldingUtenforVentetid }: SporsmalProps) => {
    const metoder = useForm({
        validationSchema: skjemavalidering,
    });
    const { register, handleSubmit, watch, errors, formState } = metoder;

    const sendSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const bekreftSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const avbrytSykmelding = useFetch<any>(); // TODO: Oppdater return type

    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);
    const avbrytdialogRef = useRef<HTMLDivElement>(document.createElement('div'));

    // For conditional visning av underspørsmål og alertbokser
    const watchOpplysningeneErRiktige = watch(Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE);
    const watchSykmeldtFra = watch(Skjemafelt.SYKMELDT_FRA);
    const watchPeriode = watch(Skjemafelt.PERIODE);
    const watchSykmeldingsgrad = watch(Skjemafelt.SYKMELDINGSGRAD);
    const watchArbeidsgiver = watch(Skjemafelt.ARBEIDSGIVER);
    const watchDiagnose = watch(Skjemafelt.DIAGNOSE);
    const watchAndreOpplysninger = watch(Skjemafelt.ANDRE_OPPLYSNINGER);

    const onSubmit = (skjemaData: any) => {
        console.log(skjemaData);
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
            <FormContext {...metoder}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PanelBase className="panelbase">
                        <SkjemaGruppe
                            feil={
                                errors.opplysningeneErRiktige
                                    ? { feilmelding: errors.opplysningeneErRiktige.message }
                                    : undefined
                            }
                        >
                            <Fieldset legend={tekster['jaEllerNei.tittel']}>
                                <Radio
                                    label={tekster['ja']}
                                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                                    value={JaEllerNei.JA}
                                    radioRef={register as any}
                                />
                                <Radio
                                    label={tekster['nei']}
                                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                                    value={JaEllerNei.NEI}
                                    radioRef={register as any}
                                />
                            </Fieldset>
                        </SkjemaGruppe>
                        <OpplysningeneErFeil
                            vis={watchOpplysningeneErRiktige === JaEllerNei.NEI}
                            visAlertstripeAvbryt={watchPeriode || watchSykmeldingsgrad}
                            visAlertstripeBrukArbeidsgiver={
                                !(watchPeriode || watchSykmeldingsgrad) && watchArbeidsgiver
                            }
                            visAlertstripeBruk={
                                !(watchPeriode || watchSykmeldingsgrad || watchArbeidsgiver) &&
                                (watchDiagnose || watchAndreOpplysninger)
                            }
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
                                feil={errors.sykmeldtFra ? { feilmelding: errors.sykmeldtFra.message } : undefined}
                            >
                                <Fieldset
                                    legend={
                                        <div style={{ display: 'flex' }}>
                                            {tekster['sykmeldtFra.tittel']}
                                            <HjelpetekstWrapper tekst={tekster['sykmeldtFra.hjelpetekst']} />
                                        </div>
                                    }
                                >
                                    {arbeidsgivere.map((arbeidsgiver, index) => (
                                        <Radio
                                            key={index}
                                            label={arbeidsgiver.navn + ` (Org. nummer:${arbeidsgiver.orgnummer})`}
                                            name={Skjemafelt.SYKMELDT_FRA}
                                            value={Arbeidsforhold.ARBEIDSGIVER.concat(
                                                '-',
                                                arbeidsgiver.orgnummer, // legg på orgnummer for å kunne sende inn riktig arbeidsgiver til ArbeidsgiverSporsmal-komponent
                                                '-',
                                                arbeidsgiver.naermesteLeder.navn, // legg på navn til nærmeste leder for å kunne sette riktig navn ved error validering
                                            )}
                                            radioRef={register as any}
                                        ></Radio>
                                    ))}
                                    <Radio
                                        label={tekster['sykmeldtFra.selvstending-naringsdrivende']}
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['sykmeldtFra.frilanser']}
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.FRILANSER}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['sykmeldtFra.annen-arbeidsgiver']}
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.ANNEN_ARBEIDSGIVER}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['sykmeldtFra.arbeidsledig']}
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.ARBEIDSLEDIG}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label={tekster['sykmeldtFra.ingenting-passer']}
                                        name={Skjemafelt.SYKMELDT_FRA}
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
                            {new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra) && (
                                <ArbeidsgiverSporsmal
                                    vis={new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra)} // sjekk om strengen "arbeidsgiver" finnes i sykmleldtFra
                                    arbeidsgiver={arbeidsgivere.find(
                                        arbeidsgiver => new RegExp(arbeidsgiver.orgnummer).test(watchSykmeldtFra), // send inn riktig arbeidsgiver basert på orgnummer
                                    )}
                                />
                            )}

                            <FrilanserSporsmal
                                vis={
                                    (watchSykmeldtFra === Arbeidsforhold.FRILANSER ||
                                        watchSykmeldtFra === Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE) &&
                                    skalViseFrilansersporsmal(sykmelding, sykmeldingUtenforVentetid)
                                }
                            />
                            <AnnenArbeidsgiver vis={watchSykmeldtFra === Arbeidsforhold.ANNEN_ARBEIDSGIVER} />
                        </PanelBase>
                    </Vis>
                    <FormSubmitKnapp
                        visAvbryt={
                            watchOpplysningeneErRiktige === JaEllerNei.NEI && (watchPeriode || watchSykmeldingsgrad)
                        }
                        onAvbryt={onAvbryt}
                        avbrytdialogRef={avbrytdialogRef}
                        setVisAvbrytdialog={setVisAvbrytDialog}
                        visSubmitSpinner={
                            sendSykmelding.status === FetchStatus.PENDING ||
                            bekreftSykmelding.status === FetchStatus.PENDING
                        }
                        visAvbrytSpinner={avbrytSykmelding.status === FetchStatus.PENDING}
                    />
                </form>

                <AvbrytDialog
                    vis={visAvbrytDialog}
                    visSpinner={avbrytSykmelding.status === FetchStatus.PENDING}
                    onAvbryt={onAvbryt}
                    setVisAvbrytDialog={setVisAvbrytDialog}
                />
            </FormContext>
        </>
    );
};

export default Sporsmal;
