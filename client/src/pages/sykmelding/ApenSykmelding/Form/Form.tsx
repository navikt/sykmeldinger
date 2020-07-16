import React from 'react';
import useForm from '../../../commonComponents/hooks/useForm';
import { Feiloppsummering, RadioPanelGruppe, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../types/sykmelding';
import { Arbeidsgiver } from '../../../../types/arbeidsgiver';
import { Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { getArbeidsgiverRadios, skalViseFrilansersporsmal } from '../../../../utils/formUtils';
import validationFunctions from './formValidation';
import Egenmeldingsdager from './Egenmeldingsdager';

enum FeilaktigeOpplysninger {
    PERIODE = 'Periode',
    SYKMELDINGSGRAD_HOY = 'Sykmeldingsgraden er for høy',
    SYKMELDINGSGRAD_LAV = 'Sykmeldingsgraden er for lav',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    ANNET = 'Andre opplysninger',
}

export enum Arbeidssituasjoner {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    ANNEN_ARBEIDSGIVER = 'ANNEN_ARBEIDSGIVER',
    ANNET = 'ANNET',
}
export interface FormInputs {
    opplysningeneErRiktige: boolean;
    feilaktigeOpplysninger: (keyof typeof FeilaktigeOpplysninger)[] | undefined;
    valgtArbeidssituasjon: string | undefined;
    valgtArbeidsgiver: Arbeidsgiver | undefined;
    beOmNyNaermesteLeder: boolean | undefined;
    harAnnetFravaer: boolean | undefined;
    fravaersperioder: { fom: Date; tom: Date }[] | undefined;
    harForsikring: boolean | undefined;
}

interface FormProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    erUtenforVentetid: boolean;
}

const Form = ({ sykmelding, arbeidsgivere, erUtenforVentetid }: FormProps) => {
    const { formState, errors, setFormState, handleSubmit } = useForm<FormInputs>({ validationFunctions });

    const skalAvbrytes = formState.feilaktigeOpplysninger?.some(
        (opplysning) => opplysning === 'PERIODE' || opplysning === 'SYKMELDINGSGRAD_LAV',
    );
    const skalSendes = !!formState.valgtArbeidsgiver;

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit((state) => console.log(state));
            }}
        >
            <RadioPanelGruppe
                name="opplysningeneErRiktige"
                className="margin-bottom--2"
                legend="Er opplysningene riktige?"
                feil={errors.get('opplysningeneErRiktige')?.feilmelding}
                checked={
                    formState.opplysningeneErRiktige
                        ? 'Ja'
                        : formState.opplysningeneErRiktige === false
                        ? 'Nei'
                        : undefined
                }
                onChange={(_event, value) => {
                    setFormState(
                        (state): Partial<FormInputs> => ({
                            ...state,
                            opplysningeneErRiktige: value === 'Ja' ? true : false,
                        }),
                    );
                }}
                radios={[
                    { label: 'Ja', value: 'Ja', id: 'opplysningeneErRiktige' },
                    { label: 'Nei', value: 'Nei' },
                ]}
            />

            {formState.opplysningeneErRiktige === false && (
                <CheckboksPanelGruppe
                    legend={'Hvilke opplysninger stemmer ikke?'}
                    className="margin-bottom--2"
                    feil={errors.get('feilaktigeOpplysninger')?.feilmelding}
                    checkboxes={[
                        {
                            label: FeilaktigeOpplysninger.PERIODE,
                            checked: formState.feilaktigeOpplysninger?.includes('PERIODE'),
                            value: 'PERIODE',
                            id: 'feilaktigeOpplysninger',
                        },
                        {
                            label: FeilaktigeOpplysninger.SYKMELDINGSGRAD_HOY,
                            checked: formState.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY'),
                            value: 'SYKMELDINGSGRAD_HOY',
                        },
                        {
                            label: FeilaktigeOpplysninger.SYKMELDINGSGRAD_LAV,
                            checked: formState.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV'),
                            value: 'SYKMELDINGSGRAD_LAV',
                        },
                        {
                            label: FeilaktigeOpplysninger.ARBEIDSGIVER,
                            checked: formState.feilaktigeOpplysninger?.includes('ARBEIDSGIVER'),
                            value: 'ARBEIDSGIVER',
                        },
                        {
                            label: FeilaktigeOpplysninger.DIAGNOSE,
                            checked: formState.feilaktigeOpplysninger?.includes('DIAGNOSE'),
                            value: 'DIAGNOSE',
                        },
                        {
                            label: FeilaktigeOpplysninger.ANNET,
                            checked: formState.feilaktigeOpplysninger?.includes('ANNET'),
                            value: 'ANNET',
                        },
                    ]}
                    onChange={(_event, value) => {
                        let updatedArray = formState.feilaktigeOpplysninger
                            ? [...formState.feilaktigeOpplysninger]
                            : [];
                        const shouldRemoveValue = updatedArray.includes(value);
                        if (shouldRemoveValue) {
                            updatedArray = updatedArray.filter((opplysning) => opplysning !== value);
                        } else {
                            updatedArray.push(value);
                        }
                        setFormState(
                            (state): Partial<FormInputs> => ({ ...state, feilaktigeOpplysninger: updatedArray }),
                        );
                    }}
                />
            )}

            {!skalAvbrytes && (
                <RadioPanelGruppe
                    legend={'Hvor er du sykmeldt fra?'}
                    name="valgtArbeidssituasjon"
                    className="margin-bottom--2"
                    feil={errors.get('valgtArbeidssituasjon')?.feilmelding}
                    checked={(() => {
                        if (formState.valgtArbeidssituasjon?.includes(Arbeidssituasjoner.ARBEIDSTAKER)) {
                            const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) =>
                                formState.valgtArbeidssituasjon?.includes(arbeidsgiver.orgnummer),
                            );
                            return `${Arbeidssituasjoner.ARBEIDSTAKER}-${arbeidsgiver?.orgnummer}`;
                        } else if (formState.valgtArbeidssituasjon === Arbeidssituasjoner.FRILANSER) {
                            return Arbeidssituasjoner.FRILANSER;
                        } else if (formState.valgtArbeidssituasjon === Arbeidssituasjoner.NAERINGSDRIVENDE) {
                            return Arbeidssituasjoner.NAERINGSDRIVENDE;
                        } else if (formState.valgtArbeidssituasjon === Arbeidssituasjoner.ANNEN_ARBEIDSGIVER) {
                            return Arbeidssituasjoner.ANNEN_ARBEIDSGIVER;
                        } else if (formState.valgtArbeidssituasjon === Arbeidssituasjoner.ARBEIDSLEDIG) {
                            return Arbeidssituasjoner.ARBEIDSLEDIG;
                        } else if (formState.valgtArbeidssituasjon === Arbeidssituasjoner.ANNET) {
                            return Arbeidssituasjoner.ANNET;
                        }
                        return undefined;
                    })()}
                    radios={[
                        ...getArbeidsgiverRadios(arbeidsgivere),
                        {
                            label: 'Jobb som frilanser',
                            value: Arbeidssituasjoner.FRILANSER,
                            id: 'valgtArbeidssituasjon',
                        },
                        {
                            label: 'Jobb som selvstendig næringsdrivende',
                            value: Arbeidssituasjoner.NAERINGSDRIVENDE,
                        },
                        {
                            label: 'Jobb hos annen arbeidsgiver',
                            value: Arbeidssituasjoner.ANNEN_ARBEIDSGIVER,
                        },
                        {
                            label: 'Jeg er arbeidsledig eller permittert',
                            value: Arbeidssituasjoner.ARBEIDSLEDIG,
                        },
                        {
                            label: 'Jeg finner ingenting som passer for meg',
                            value: Arbeidssituasjoner.ANNET,
                        },
                    ]}
                    onChange={(_event, value: string) => {
                        const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) =>
                            value.includes(arbeidsgiver.orgnummer),
                        );
                        setFormState(
                            (state): Partial<FormInputs> => ({
                                ...state,
                                valgtArbeidssituasjon: value,
                                valgtArbeidsgiver: arbeidsgiver ? arbeidsgiver : undefined,
                                beOmNyNaermesteLeder: undefined,
                            }),
                        );
                    }}
                />
            )}

            {!skalAvbrytes && !!formState.valgtArbeidsgiver && (
                <RadioPanelGruppe
                    name="beOmNyNaermesteLeder"
                    className="margin-bottom--1"
                    legend={`Er det ${formState.valgtArbeidsgiver.naermesteLeder.navn} som skal følge deg opp når du er syk?`}
                    feil={errors.get('beOmNyNaermesteLeder')?.feilmelding}
                    checked={
                        formState.beOmNyNaermesteLeder
                            ? 'Nei'
                            : formState.beOmNyNaermesteLeder === false
                            ? 'Ja'
                            : undefined
                    }
                    onChange={(_event, value) => {
                        setFormState(
                            (state): Partial<FormInputs> => ({
                                ...state,
                                beOmNyNaermesteLeder: value === 'Nei' ? true : false,
                            }),
                        );
                    }}
                    radios={[
                        { label: 'Ja', value: 'Ja', id: 'beOmNyNaermesteLeder' },
                        { label: 'Nei', value: 'Nei' },
                    ]}
                />
            )}

            {formState.beOmNyNaermesteLeder === false && (
                <Normaltekst className="margin-bottom--2">
                    Vi sender sykmeldingen til {formState.valgtArbeidsgiver?.naermesteLeder.navn}, som finner den ved å
                    logge inn på nav.no.
                </Normaltekst>
            )}

            {formState.beOmNyNaermesteLeder === true && (
                <Normaltekst className="margin-bottom--2">
                    Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                </Normaltekst>
            )}

            {skalViseFrilansersporsmal(
                formState.valgtArbeidssituasjon,
                erUtenforVentetid,
                sykmelding.sykmeldingsperioder,
            ) && (
                <>
                    <RadioPanelGruppe
                        name="harAnnetFravaer"
                        className="margin-bottom--2"
                        legend={`Vi har registrert at du ble sykmeldt ${dayjs(sykmelding.syketilfelleStartDato).format(
                            'D. MMM YYYY',
                        )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`}
                        feil={errors.get('harAnnetFravaer')?.feilmelding}
                        checked={
                            formState.harAnnetFravaer ? 'Ja' : formState.harAnnetFravaer === false ? 'Nei' : undefined
                        }
                        onChange={(_event, value) => {
                            setFormState(
                                (state): Partial<FormInputs> => ({
                                    ...state,
                                    harAnnetFravaer: value === 'Ja' ? true : false,
                                    fravaersperioder: undefined,
                                }),
                            );
                        }}
                        radios={[
                            { label: 'Ja', value: 'Ja', id: 'harAnnetFravaer' },
                            { label: 'Nei', value: 'Nei' },
                        ]}
                    />

                    {formState.harAnnetFravaer && (
                        <Egenmeldingsdager
                            formState={formState}
                            setFormState={setFormState}
                            sykmeldingStartdato={sykmelding.syketilfelleStartDato}
                            feil={errors.get('fravaersperioder')?.feilmelding}
                        />
                    )}

                    <RadioPanelGruppe
                        name="harForsikring"
                        className="margin-bottom--2"
                        legend="Har du forsikring som gjelder de første 16 dagene av sykefraværet?"
                        feil={errors.get('harForsikring')?.feilmelding}
                        checked={formState.harForsikring ? 'Ja' : formState.harForsikring === false ? 'Nei' : undefined}
                        onChange={(_event, value) => {
                            setFormState(
                                (state): Partial<FormInputs> => ({
                                    ...state,
                                    harForsikring: value === 'Ja' ? true : false,
                                }),
                            );
                        }}
                        radios={[
                            { label: 'Ja', value: 'Ja', id: 'harForsikring' },
                            { label: 'Nei', value: 'Nei' },
                        ]}
                    />
                </>
            )}

            {!!errors.size && (
                <Feiloppsummering className="margin-bottom--2" tittel="feil" feil={Array.from(errors.values())} />
            )}

            {!skalAvbrytes && (
                <Knapp type="hoved" className="margin-bottom--2">
                    {skalSendes ? 'Send' : 'Bekreft'} sykmelding
                </Knapp>
            )}
        </form>
    );
};

export default Form;
