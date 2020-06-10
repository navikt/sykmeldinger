import './Sporsmal.less';

import PanelBase from 'nav-frontend-paneler';
import React, { useRef, useState } from 'react';
import useForm, { FormContext } from 'react-hook-form';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import AnnenArbeidsgiver from './AnnenArbeidsgiver';
import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import ArbeidsgiverSporsmal from './tilleggssporsmal/ArbeidsgiverSporsmal';
import AvbrytDialog from './AvbrytDialog';
import FormSubmitKnapp from './FormSubmitKnapp';
import FrilanserSporsmal from './tilleggssporsmal/FrilanserSporsmal';
import HjelpetekstWrapper from '../../components/Hjelpetekst/HjelpetekstWrapper';
import OpplysningeneErFeil from './tilleggssporsmal/OpplysningeneErFeil';
import Vis from '../../../../utils/vis';
import { AlertStripeHjelper } from '../../../../utils/alertstripe-utils';
import { Arbeidsforhold, JaEllerNei, Skjemafelt } from '../../../../types/sporsmalTypes';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import { skalViseFrilansersporsmal } from '../../../../utils/sporsmal-utils';
import { skjemavalidering } from './valideringsSkjema';

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

    // TODO: legg til skjemadata type
    const onSubmit = (skjemaData: any) => {
        const skalSende = skjemaData.sykmeldtFra.includes(Arbeidsforhold.ARBEIDSGIVER);

        if (skalSende) {
            // TODO: Send sykmelding. Create re-usable function as sending is done from multiple components
            console.log('Send sykmelding TODO');
        } else {
            // TODO: Bekreft sykmelding. Create re-usable function as bekrefting is done from multiple components
            console.log('Bekreft sykmelding TODO');
        }
    };

    const onAvbryt = () => {
        // TODO: Avbryt sykmelding.
        console.log('Avbryt sykmelding TODO');
    };

    return (
        <>
            <AlertStripeHjelper
                vis={formState.isSubmitted && !formState.isValid}
                type="feil"
                tekst="Vennligst svar på alle feltene i skjemaet"
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
                            <fieldset>
                                <legend>Er opplysningene i sykmeldingen riktige?</legend>
                                <Radio
                                    label="Ja"
                                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                                    value={JaEllerNei.JA}
                                    radioRef={register as any}
                                />
                                <Radio
                                    label="Nei"
                                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                                    value={JaEllerNei.NEI}
                                    radioRef={register as any}
                                />
                            </fieldset>
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
                                <fieldset>
                                    <legend>
                                        <div style={{ display: 'flex' }}>
                                            Jeg er sykmeldt fra
                                            <HjelpetekstWrapper tekst="Er du sykmeldt fra flere arbeidssituasjoner må du ha én sykmelding per arbeidssituasjon. Trenger du flere sykmeldinger, må du kontakte den som har sykmeldt deg." />
                                        </div>
                                    </legend>
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
                                        label="Jobb som selvstendig næringsdrivende"
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.SELSTENDIG_NARINGSDRIVENDE}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label="Jobb som frilanser"
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.FRILANSER}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label="Jobb hos en annen arbeidsgiver"
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.ANNEN_ARBEIDSGIVER}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label="Jeg er arbeidsledig"
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.ARBEIDSLEDIG}
                                        radioRef={register as any}
                                    />
                                    <Radio
                                        label="Jeg finner ingenting som passer for meg"
                                        name={Skjemafelt.SYKMELDT_FRA}
                                        value={Arbeidsforhold.INGENTING_PASSER}
                                        radioRef={register as any}
                                    />
                                </fieldset>
                                <AlertStripeHjelper
                                    vis={!!sykmelding.arbeidsgiver.navn}
                                    type="info"
                                    tekst={`Den som sykmeldte deg har oppgitt at du er sykmeldt fra ${sykmelding.arbeidsgiver.navn}`}
                                />
                            </SkjemaGruppe>
                            {new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra) && (
                                <ArbeidsgiverSporsmal
                                    vis={new RegExp(Arbeidsforhold.ARBEIDSGIVER).test(watchSykmeldtFra)} // sjekk om strengen "arbeidsgiver" finnes i sykmleldtFra
                                    arbeidsgiver={arbeidsgivere.find(
                                        (arbeidsgiver) => new RegExp(arbeidsgiver.orgnummer).test(watchSykmeldtFra), // send inn riktig arbeidsgiver basert på orgnummer
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
                        visSubmitSpinner={false}
                        visAvbrytSpinner={false}
                    />
                </form>

                <AvbrytDialog
                    vis={visAvbrytDialog}
                    visSpinner={false}
                    onAvbryt={onAvbryt}
                    setVisAvbrytDialog={setVisAvbrytDialog}
                />
            </FormContext>
        </>
    );
};

export default Sporsmal;
