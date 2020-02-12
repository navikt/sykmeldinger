import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import React, { SyntheticEvent, useRef, useState } from 'react';
import { CheckboksPanelGruppe, Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';

import Vis from '../../../utils/vis';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
} from './skjemaComponents/skjemaTypes';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import { clearDependentValues, getErrorMessages } from './skjemaComponents/skjemaUtils';
import { validateAll, validateField, validators } from './skjemaComponents/validators';

export const fieldValuesSchema: FieldValuesType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: undefined,
    [Skjemafelt.SYKMELDT_FRA]: undefined,
    [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
    [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
    [Skjemafelt.OPPFOLGING]: undefined,
    [Skjemafelt.FEIL_OPPLYSNINGER]: [],
    [Skjemafelt.EGENMELDINGSPERIODER]: [], // TODO: Dato
};

export const errorSchema: ErrorsSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: null,
    [Skjemafelt.SYKMELDT_FRA]: null,
    [Skjemafelt.FRILANSER_EGENMELDING]: null,
    [Skjemafelt.FRILANSER_FORSIKRING]: null,
    [Skjemafelt.OPPFOLGING]: null,
    [Skjemafelt.FEIL_OPPLYSNINGER]: null,
    [Skjemafelt.EGENMELDINGSPERIODER]: null,
};

export type FormProps = {
    errorMessages: FeiloppsummeringFeil[];
    fieldValues: FieldValuesType;
    errors: ErrorsSchemaType;
    onSubmit: any;
    handleChange: any;
    reset: (event: SyntheticEvent) => void;
    feiloppsummering: React.RefObject<HTMLDivElement>;
    submitting: boolean;
};

// TODO: Erstatt any
const Form = ({
    errorMessages,
    fieldValues,
    errors,
    onSubmit,
    handleChange,
    reset,
    feiloppsummering,
    submitting,
}: FormProps) => {
    const trengerNySykmelding = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(value =>
        [FeilOpplysninger.PERIODE, FeilOpplysninger.SYKMELDINGSGRAD].includes(value as FeilOpplysninger),
    );
    const feilArbeidsgiver = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].includes(FeilOpplysninger.ARBEIDSGIVER);
    const trengerIkkeNySykmelding = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(value =>
        [FeilOpplysninger.DIAGNOSE, FeilOpplysninger.ANDRE_OPPLYSNINGER].includes(value as FeilOpplysninger),
    );

    return (
        <form onSubmit={onSubmit}>
            <Panel>
                <RadioPanelGruppe
                    name={Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE}
                    legend={'Er opplysningene i sykmeldingen riktige?'}
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
                    feil={errors.opplysninger ? errors.opplysninger : null}
                />
                <Vis hvis={fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.NEI}>
                    <br />
                    <CheckboksPanelGruppe
                        legend={'Hvilke opplysninger er ikke riktige?'}
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
                        <AlertStripe type="advarsel">
                            <strong>Du trenger ny sykmelding.</strong>
                            <br />
                            Du trenger ny sykmelding. Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt
                            deg for å få en ny. For å avbryte, velg "Jeg ønsker ikke å bruke denne sykmeldingen" nederst
                            på siden
                        </AlertStripe>
                    </Vis>

                    <Vis hvis={!trengerNySykmelding && feilArbeidsgiver}>
                        <br />
                        <AlertStripe type="info">
                            <strong>Du kan bruke sykmeldingen din.</strong>
                            <br />
                            Du velger hvilken arbeidsgiver sykmeldingen skal sendes til i neste spørsmål. Obs!
                            Arbeidsgiveren som står i sykmeldingen fra før endres ikke, og vil være synlig for
                            arbeidsgiveren du sender sykmeldingen til. Får du flere sykmeldinger må du gi beskjed til
                            den som sykmelder deg om at det er lagt inn feil arbeidsgiver.
                        </AlertStripe>
                    </Vis>

                    <Vis hvis={trengerIkkeNySykmelding && !feilArbeidsgiver && !trengerNySykmelding}>
                        <br />
                        <AlertStripe type="info">
                            <strong>Du kan bruke sykmeldingen din.</strong>
                            <br />
                            Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at
                            den inneholder feil.
                        </AlertStripe>
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
                        legend={'Jeg er sykmeldt fra'}
                        radios={[
                            {
                                label: 'arbeidsgiver1',
                                value: Arbeidsforhold.ARBEIDSGIVER,
                                id: `b-${Arbeidsforhold.ARBEIDSGIVER}`,
                            },
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

                    <Vis
                        hvis={
                            fieldValues[Skjemafelt.SYKMELDT_FRA] ===
                            Arbeidsforhold.ARBEIDSGIVER /* TODO: Legg til alle arbeidsgivere */
                        }
                    >
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.OPPFOLGING}
                            legend={'Er det <ARBEIDSGIVER> som skal følge deg opp på jobben når du er syk?'}
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

                        <Vis hvis={fieldValues.oppfolging === JaEllerNei.JA}>
                            <br />
                            Vi sender sykmeldingen til ANSVARLIG LEDER, som finner den ved å logge inn på nav.no.
                        </Vis>
                        <Vis hvis={fieldValues.oppfolging === JaEllerNei.NEI}>
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
                            legend={
                                'Vi har registrert at du ble sykmeldt <SYKMELDING DATO>. Brukte du egenmelding eller noen annen sykmelding før denne datoen?'
                            }
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
                            DATOVALG
                        </Vis>
                        <br />
                        <RadioPanelGruppe
                            name={Skjemafelt.FRILANSER_FORSIKRING}
                            legend={'Har du forsikring som gjelder de første 16 dagene av sykefraværet?'}
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
                        tittel="For å gå videre må du rette opp følgende:"
                        feil={errorMessages}
                    />
                </>
            )}
            <br />
            <>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <Hovedknapp htmlType="submit" spinner={submitting} data-testid="knapp-submit">
                        {true ? 'knapp.send-sykmeldingen' : 'knapp.bekreft-sykmeldingen'}
                    </Hovedknapp>
                </div>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <Lenke
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            // setVisAvbrytdialog(vises => !vises);
                            /*setTimeout(
                                () => window.scrollTo({ top: avbrytdialogRef.current.offsetTop, behavior: 'smooth' }),
                                300,
                            );*/
                        }}
                    >
                        knapp.onsker-ikke-bruke-sykmelding
                    </Lenke>
                </div>
            </>
        </form>
    );
};

const SendingsSkjema = ({ sykmelding }: { sykmelding: Sykmelding }) => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(errorSchema);
    const [fieldValues, setFieldValues] = useState(fieldValuesSchema);
    const feiloppsummering = useRef<HTMLDivElement>(null);

    console.log(sykmelding);

    const reset = (event: SyntheticEvent) => {
        if (event) {
            event.preventDefault();
        }

        setSubmitSuccess(false);
        setSubmitAttempt(false);
        setSubmitting(false);
        setErrors(errorSchema);
        setFieldValues(fieldValuesSchema);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        const errors = validateAll(fieldValues, errorSchema);

        const hasErrors = Object.values(errors).some(error => !!error);

        if (hasErrors) {
            setErrors(errors);
            setSubmitAttempt(true);
            feiloppsummering.current?.focus();
        } else {
            setSubmitAttempt(false);
            setSubmitting(true);

            // do submit
            console.log('submitting', fieldValues);

            window.setTimeout(() => {
                setSubmitting(false);
                setSubmitSuccess(true);
            }, 500);
        }
    };

    const handleChange = (value: string, name: Skjemafelt) => {
        const { updatedFieldValues, updatedErrors } = clearDependentValues(name, errors, fieldValues);

        const getValue = () => {
            if (name === Skjemafelt.FEIL_OPPLYSNINGER) {
                const index = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(value as FeilOpplysninger);

                if (index === -1) {
                    return [...fieldValues[Skjemafelt.FEIL_OPPLYSNINGER], value];
                }

                return fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].filter((_key, oIndex) => oIndex !== index);
            }

            return value;
        };

        const updatedValues = { ...updatedFieldValues, [name]: getValue() };

        const invalid = validateField(name, validators, updatedValues);

        if (submitAttempt) {
            const newErrors = { ...updatedErrors, [name]: invalid ? invalid.failText : null };

            setErrors(newErrors);

            const hasErrors = validateAll(updatedValues, errorSchema);

            if (!hasErrors) {
                setSubmitAttempt(false);
            }
        }

        setFieldValues(updatedValues);
    };

    const errorMessages = getErrorMessages(errors);

    return (
        <div className="form-test">
            <div aria-live="assertive">
                {!submitSuccess && (
                    <Form
                        errorMessages={errorMessages}
                        fieldValues={fieldValues}
                        errors={errors}
                        onSubmit={submit}
                        handleChange={handleChange}
                        reset={reset}
                        feiloppsummering={feiloppsummering}
                        submitting={submitting}
                    />
                )}
                {submitSuccess && <div>Skjema sendt</div>}
            </div>
        </div>
    );
};

export default SendingsSkjema;
