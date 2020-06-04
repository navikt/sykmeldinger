import React, { useRef } from 'react';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CheckboksPanelGruppe, Feiloppsummering, RadioPanelGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';

import Arbeidsgiver from '../../../../types/arbeidsgiverTypes';
import Egenmeldingsdager from './Egenmeldingsdager';
import SubmitKnapp from './SubmitKnapp';
import Vis from '../../../../utils/vis';
import tekster from '../SendingsSkjema-tekster';
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
import { getLedetekst } from '../../../../utils/utils';

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
    const trengerIkkeNySykmelding = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(value =>
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
                    legend={tekster['jaEllerNei.tittel']}
                    radios={[
                        {
                            label: tekster['ja'],
                            value: JaEllerNei.JA,
                            id: `b-${Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}`,
                        },
                        {
                            label: tekster['nei'],
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
                        legend={tekster['opplysningeneErFeil.tittel']}
                        checkboxes={[
                            {
                                label: tekster['opplysningeneErFeil.periode'],
                                value: FeilOpplysninger.PERIODE,
                                id: `b-${Skjemafelt.FEIL_OPPLYSNINGER}`,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.PERIODE) !== -1,
                            },
                            {
                                label: tekster['opplysningeneErFeil.sykmeldingsgrad'],
                                value: FeilOpplysninger.SYKMELDINGSGRAD,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(
                                        FeilOpplysninger.SYKMELDINGSGRAD,
                                    ) !== -1,
                            },
                            {
                                label: tekster['opplysningeneErFeil.arbeidsgiver'],
                                value: FeilOpplysninger.ARBEIDSGIVER,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.ARBEIDSGIVER) !==
                                    -1,
                            },
                            {
                                label: tekster['opplysningeneErFeil.diagnose'],
                                value: FeilOpplysninger.DIAGNOSE,
                                checked:
                                    fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(FeilOpplysninger.DIAGNOSE) !== -1,
                            },
                            {
                                label: tekster['opplysningeneErFeil.andreOpplysninger'],
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
                            <strong>{tekster['alertstripe.du-trenger-ny-sykmelding.tittel']}</strong>
                            <br />
                            {tekster['alertstripe.du-trenger-ny-sykmelding.tekst']}
                        </AlertStripeAdvarsel>
                    </Vis>

                    <Vis hvis={!trengerNySykmelding && feilArbeidsgiver}>
                        <br />
                        <AlertStripeInfo>
                            <strong>{tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}</strong>
                            <br />
                            {tekster['alertstripe.du-kan-bruke-sykmeldingen.arbeidsgiver.tekst']}
                        </AlertStripeInfo>
                    </Vis>

                    <Vis hvis={trengerIkkeNySykmelding && !feilArbeidsgiver && !trengerNySykmelding}>
                        <br />
                        <AlertStripeInfo>
                            <strong>{tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}</strong>
                            <br />
                            {tekster['alertstripe.du-kan-bruke-sykmeldingen.tekst']}
                        </AlertStripeInfo>
                    </Vis>
                </Vis>
            </Panel>

            <Vis
                hvis={
                    fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.JA ||
                    (fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(verdi =>
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
                        legend={tekster['sykmeldtFra.tittel']}
                        radios={[
                            ...arbeidsGiverRadios,
                            {
                                label: tekster['sykmeldtFra.selvstending-naringsdrivende'],
                                value: Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE,
                            },
                            {
                                label: tekster['sykmeldtFra.frilanser'],
                                value: Arbeidsforhold.FRILANSER,
                            },
                            {
                                label: tekster['sykmeldtFra.annen-arbeidsgiver'],
                                value: Arbeidsforhold.ANNEN_ARBEIDSGIVER,
                            },
                            {
                                label: tekster['sykmeldtFra.arbeidsledig'],
                                value: Arbeidsforhold.ARBEIDSLEDIG,
                            },
                            {
                                label: tekster['sykmeldtFra.ingenting-passer'],
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
                            {getLedetekst(tekster['sykmeldtFra.sykmelders-svar'], {
                                '%ARBEIDSGIVER%': sykmelding.arbeidsgiver.navn,
                            })}
                        </AlertStripeInfo>
                    </Vis>

                    <Vis hvis={fieldValues[Skjemafelt.SYKMELDT_FRA] === Arbeidsforhold.ANNEN_ARBEIDSGIVER}>
                        <br />
                        <AlertStripeAdvarsel>
                            {tekster['alertstripe.annen-arbeidsgiver']}
                            <br />
                            <br />
                            <Knapp>{tekster['skriv-ut']}</Knapp>
                        </AlertStripeAdvarsel>
                    </Vis>

                    <Vis hvis={!!fieldValues[Skjemafelt.SYKMELDT_FRA]?.startsWith(Arbeidsforhold.ARBEIDSGIVER)}>
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.OPPFOLGING}
                            legend={getLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.tittel'], {
                                '%ARBEIDSGIVER%': valgtArbeidsgiverNaermesteLederNavn,
                            })}
                            radios={[
                                {
                                    label: tekster['ja'],
                                    value: JaEllerNei.JA,
                                    id: `b-${Skjemafelt.OPPFOLGING}`,
                                },
                                {
                                    label: tekster['nei'],
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
                            {getLedetekst(tekster['sykmeldtFra.arbeidsgiver.bekreft.ja'], {
                                '%ARBEIDSGIVER%': valgtArbeidsgiverNaermesteLederNavn,
                            })}
                        </Vis>
                        <Vis hvis={fieldValues[Skjemafelt.OPPFOLGING] === JaEllerNei.NEI}>
                            <br />
                            {tekster['sykmeldtFra.arbeidsgiver.bekreft.nei']}
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
                            legend={getLedetekst(tekster['frilanser.egenmelding.tittel'], {
                                '%DATO%': new Date() /* // TODO: Riktig dato */,
                            })}
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
                            legend={tekster['frilanser.forsikring.tittel']}
                            radios={[
                                {
                                    label: tekster['ja'],
                                    value: JaEllerNei.JA,
                                    id: `b-${Skjemafelt.FRILANSER_FORSIKRING}`,
                                },
                                {
                                    label: tekster['nei'],
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
                        tittel={tekster['feilmelding.feiloppsummering.tittel']}
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
