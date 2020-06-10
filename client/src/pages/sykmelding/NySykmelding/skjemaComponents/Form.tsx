import React, { useRef } from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CheckboksPanelGruppe, Feiloppsummering, RadioPanelGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';

import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import Egenmeldingsdager from './Egenmeldingsdager';
import SubmitKnapp from './SubmitKnapp';
import Vis from '../../../../utils/vis';
import useAppStore from '../../../../data/useAppStore';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
} from './skjemaTypes';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import {
    brukerTrengerNySykmelding,
    getErrorMessages,
    hentArbeidsGiverRadios,
    hentValgtArbeidsgiverNaermesteLederNavn,
} from './skjemaUtils';

export type FormProps = {
    sykmelding: Sykmelding;
    fieldValues: FieldValuesType;
    errors: ErrorsSchemaType;
    onSubmit: any;
    onAvbryt: () => void;
    handleChange: (value: string | string[] | string[][], name: Skjemafelt) => void;
    feiloppsummering: React.RefObject<HTMLDivElement>;
    submitting: boolean;
    skalViseSend: boolean;
    skalViseAvbryt: boolean;
    arbeidsgivere: Arbeidsgiver[];
    setVisAvbrytDialog: (val: boolean) => void;
};

// TODO: Erstatt any
const Form = ({
    sykmelding,
    fieldValues,
    errors,
    onSubmit,
    onAvbryt,
    handleChange,
    feiloppsummering,
    submitting,
    skalViseSend,
    skalViseAvbryt,
    setVisAvbrytDialog,
}: FormProps) => {
    const { arbeidsgivere } = useAppStore();

    const avbrytdialogRef = useRef<HTMLDivElement>(document.createElement('div'));

    const trengerNySykmelding = brukerTrengerNySykmelding(fieldValues);

    const feilArbeidsgiver = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].includes(FeilOpplysninger.ARBEIDSGIVER);
    const trengerIkkeNySykmelding = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some((value) =>
        [FeilOpplysninger.DIAGNOSE, FeilOpplysninger.ANDRE_OPPLYSNINGER].includes(value as FeilOpplysninger),
    );

    const errorMessages = getErrorMessages(errors);
    const arbeidsGiverRadios = hentArbeidsGiverRadios(arbeidsgivere);
    const valgtArbeidsgiverNaermesteLederNavn = hentValgtArbeidsgiverNaermesteLederNavn(fieldValues, arbeidsgivere);

    return (
        <form onSubmit={onSubmit}>
            <Panel>
                <RadioPanelGruppe
                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                    legend="Er opplysningene i sykmeldingen riktige?"
                    radios={[
                        {
                            label: 'Ja',
                            value: JaEllerNei.JA,
                            id: `b-${Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}`,
                        },
                        {
                            label: 'Nei',
                            value: JaEllerNei.NEI,
                        },
                    ]}
                    onChange={(e, value) => handleChange(value, Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE)}
                    checked={fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]}
                    // @ts-ignore // TODO: Finn ut av riktig TS type her
                    feil={
                        errors[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] ? errors[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] : null
                    }
                />
                <Vis hvis={fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.NEI}>
                    <br />
                    <CheckboksPanelGruppe
                        legend="Hvilke opplysninger er ikke riktige?"
                        checkboxes={[
                            {
                                label: 'Periode',
                                value: FeilOpplysninger.PERIODE,
                                id: `b-${Skjemafelt.FEIL_OPPLYSNINGER}`,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.PERIODE) !== -1,
                            },
                            {
                                label: 'Sykmeldingsgrad',
                                value: FeilOpplysninger.SYKMELDINGSGRAD,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(
                                        FeilOpplysninger.SYKMELDINGSGRAD,
                                    ) !== -1,
                            },
                            {
                                label: 'Arbeidsgiver',
                                value: FeilOpplysninger.ARBEIDSGIVER,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.ARBEIDSGIVER) !==
                                    -1,
                            },
                            {
                                label: 'Diagnose',
                                value: FeilOpplysninger.DIAGNOSE,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.DIAGNOSE) !== -1,
                            },
                            {
                                label: 'Andre opplysninger',
                                value: FeilOpplysninger.ANDRE_OPPLYSNINGER,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(
                                        FeilOpplysninger.ANDRE_OPPLYSNINGER,
                                    ) !== -1,
                            },
                        ]}
                        onChange={(e, value) => handleChange(value, Skjemafelt.FEIL_OPPLYSNINGER)}
                        // @ts-ignore // TODO: Finn ut av riktig TS type her
                        feil={errors[Skjemafelt.FEIL_OPPLYSNINGER] ? errors[Skjemafelt.FEIL_OPPLYSNINGER] : null}
                    />
                    <Vis hvis={trengerNySykmelding}>
                        <br />
                        <AlertStripeAdvarsel>
                            <strong>Du trenger ny sykmelding.</strong>
                            <br />
                            Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny. For å
                            avbryte, velg "Jeg ønsker ikke å bruke denne sykmeldingen" nederst på siden.
                        </AlertStripeAdvarsel>
                    </Vis>

                    <Vis hvis={!trengerNySykmelding && feilArbeidsgiver}>
                        <br />
                        <AlertStripeInfo>
                            <strong>Du kan bruke sykmeldingen din.</strong>
                            <br />
                            Du velger hvilken arbeidsgiver sykmeldingen skal sendes til i neste spørsmål. Obs!
                            Arbeidsgiveren som står i sykmeldingen fra før endres ikke, og vil være synlig for
                            arbeidsgiveren du sender sykmeldingen til. Får du flere sykmeldinger må du gi beskjed til
                            den som sykmelder deg om at det er lagt inn feil arbeidsgiver.
                        </AlertStripeInfo>
                    </Vis>

                    <Vis hvis={trengerIkkeNySykmelding && !feilArbeidsgiver && !trengerNySykmelding}>
                        <br />
                        <AlertStripeInfo>
                            <strong>Du kan bruke sykmeldingen din.</strong>
                            <br />
                            Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at
                            den inneholder feil.
                        </AlertStripeInfo>
                    </Vis>
                </Vis>
            </Panel>

            <Vis
                hvis={
                    fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.JA ||
                    (fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some((verdi) =>
                        [
                            FeilOpplysninger.ARBEIDSGIVER,
                            FeilOpplysninger.DIAGNOSE,
                            FeilOpplysninger.ANDRE_OPPLYSNINGER,
                        ].includes(verdi as FeilOpplysninger),
                    ) &&
                        !trengerNySykmelding)
                }
            >
                <br />
                <Panel>
                    <RadioPanelGruppe
                        name={Skjemafelt.SYKMELDT_FRA}
                        legend="Jeg er sykmeldt fra"
                        radios={[
                            ...arbeidsGiverRadios,
                            {
                                label: 'Jobb som selvstendig næringsdrivende',
                                value: Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE,
                            },
                            {
                                label: 'Jobb som frilanser',
                                value: Arbeidsforhold.FRILANSER,
                            },
                            {
                                label: 'Jobb hos en annen arbeidsgiver',
                                value: Arbeidsforhold.ANNEN_ARBEIDSGIVER,
                            },
                            {
                                label: 'Jeg er arbeidsledig',
                                value: Arbeidsforhold.ARBEIDSLEDIG,
                            },
                            {
                                label: 'Jeg finner ingenting som passer for meg',
                                value: Arbeidsforhold.INGENTING_PASSER,
                            },
                        ]}
                        onChange={(e, value) => handleChange(value, Skjemafelt.SYKMELDT_FRA)}
                        checked={fieldValues[Skjemafelt.SYKMELDT_FRA]}
                        // @ts-ignore // TODO: Finn ut av riktig TS type her
                        feil={errors[Skjemafelt.SYKMELDT_FRA] ? errors[Skjemafelt.SYKMELDT_FRA] : null}
                    />

                    <Vis hvis={!!sykmelding.arbeidsgiver.navn}>
                        <br />
                        <AlertStripeInfo>
                            Den som sykmeldte deg har oppgitt at du er sykmeldt fra {sykmelding.arbeidsgiver.navn}
                        </AlertStripeInfo>
                    </Vis>

                    <Vis hvis={fieldValues[Skjemafelt.SYKMELDT_FRA] === Arbeidsforhold.ANNEN_ARBEIDSGIVER}>
                        <br />
                        <AlertStripeAdvarsel>
                            Siden du ikke finner arbeidsgiveren din i denne listen, kan du ikke sende sykmeldingen
                            digitalt. Du bør spørre arbeidsgiveren din om hvorfor de ikke har registrert deg som
                            arbeidstaker i A-meldingen.
                            <br />
                            <br />
                            <Knapp>SKRIV UT</Knapp>
                        </AlertStripeAdvarsel>
                    </Vis>

                    <Vis hvis={!!fieldValues[Skjemafelt.SYKMELDT_FRA]?.startsWith(Arbeidsforhold.ARBEIDSGIVER)}>
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.OPPFOLGING}
                            legend={`Er det ${valgtArbeidsgiverNaermesteLederNavn} som skal følge deg opp på jobben når du er syk?`}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: JaEllerNei.JA,
                                    id: `b-${Skjemafelt.OPPFOLGING}`,
                                },
                                {
                                    label: 'Nei',
                                    value: JaEllerNei.NEI,
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, Skjemafelt.OPPFOLGING)}
                            checked={fieldValues[Skjemafelt.OPPFOLGING]}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors[Skjemafelt.OPPFOLGING] ? errors[Skjemafelt.OPPFOLGING] : null}
                        />

                        <Vis hvis={fieldValues[Skjemafelt.OPPFOLGING] === JaEllerNei.JA}>
                            <br />
                            Vi sender sykmeldingen til {valgtArbeidsgiverNaermesteLederNavn}, som finner den ved å logge
                            inn på nav.no.
                        </Vis>
                        <Vis hvis={fieldValues[Skjemafelt.OPPFOLGING] === JaEllerNei.NEI}>
                            <br />
                            Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                        </Vis>
                    </Vis>
                    <Vis
                        hvis={
                            !!fieldValues[Skjemafelt.SYKMELDT_FRA] &&
                            [Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE, Arbeidsforhold.FRILANSER].includes(
                                fieldValues[Skjemafelt.SYKMELDT_FRA]!,
                            )
                        }
                    >
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.FRILANSER_EGENMELDING}
                            legend={`Vi har registrert at du ble sykmeldt ${new Date()}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: JaEllerNei.JA,
                                    id: `b-${Skjemafelt.FRILANSER_EGENMELDING}`,
                                },
                                {
                                    label: 'Nei',
                                    value: JaEllerNei.NEI,
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, Skjemafelt.FRILANSER_EGENMELDING)}
                            checked={fieldValues[Skjemafelt.FRILANSER_EGENMELDING]}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={
                                errors[Skjemafelt.FRILANSER_EGENMELDING]
                                    ? errors[Skjemafelt.FRILANSER_EGENMELDING]
                                    : null
                            }
                        />

                        <Vis hvis={fieldValues[Skjemafelt.FRILANSER_EGENMELDING] === JaEllerNei.JA}>
                            <br />
                            <SkjemaGruppe
                                feil={
                                    errors[Skjemafelt.EGENMELDINGSPERIODER]
                                        ? errors[Skjemafelt.EGENMELDINGSPERIODER]
                                        : null
                                }
                            >
                                <Egenmeldingsdager
                                    name={Skjemafelt.EGENMELDINGSPERIODER}
                                    handleChange={handleChange}
                                    perioder={fieldValues[Skjemafelt.EGENMELDINGSPERIODER]}
                                    sykmeldingStartdato={
                                        new Date(
                                            Date.now() - 5 * 24 * 60 * 60 * 1000,
                                        ) /* // TODO: Erstatt med faktisk startdato */
                                    }
                                />
                            </SkjemaGruppe>
                        </Vis>
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.FRILANSER_FORSIKRING}
                            legend="Har du forsikring som gjelder de første 16 dagene av sykefraværet?"
                            radios={[
                                {
                                    label: 'Ja',
                                    value: JaEllerNei.JA,
                                    id: `b-${Skjemafelt.FRILANSER_FORSIKRING}`,
                                },
                                {
                                    label: 'Nei',
                                    value: JaEllerNei.NEI,
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, Skjemafelt.FRILANSER_FORSIKRING)}
                            checked={fieldValues[Skjemafelt.FRILANSER_FORSIKRING]}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={
                                errors[Skjemafelt.FRILANSER_FORSIKRING] ? errors[Skjemafelt.FRILANSER_FORSIKRING] : null
                            }
                        />
                    </Vis>
                </Panel>
            </Vis>
            {errorMessages && !!errorMessages.length && (
                <>
                    <br />
                    <Feiloppsummering
                        innerRef={feiloppsummering}
                        tittel="For å gå videre må du rette opp følgende"
                        feil={errorMessages}
                    />
                </>
            )}
            <br />
            <SubmitKnapp
                skalViseAvbryt={skalViseAvbryt}
                skalViseSend={skalViseSend}
                submitting={submitting}
                onAvbryt={onAvbryt}
                setVisAvbrytDialog={setVisAvbrytDialog}
                avbrytdialogRef={avbrytdialogRef}
            />
        </form>
    );
};

export default Form;
