import React from 'react';
import useForm, { ValidationFunctions } from '../../commonComponents/hooks/useForm';
import { Feiloppsummering, RadioPanelGruppe, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../types/sykmelding';
import { Arbeidsgiver } from '../../../types/arbeidsgiver';

type UriktigeOpplysninger = 'DIAGNOSE' | 'PERIODE' | 'ANNET';

interface Form {
    opplysningeneErRiktige: boolean;
    uriktigeOpplysninger?: UriktigeOpplysninger[];
    sykmeldtFra?: 'FRILANSER' | 'ARBEIDSGIVER' | 'ANNET';
}

const validationFunctions: ValidationFunctions<Form> = {
    opplysningeneErRiktige: (state) => {
        if (state.opplysningeneErRiktige === undefined) {
            return 'Du må svare på om opplysnigene er riktige';
        }
    },
    uriktigeOpplysninger: (state) => {
        console.log(state);
        if (!state.opplysningeneErRiktige) {
            if (!state.uriktigeOpplysninger || !state.uriktigeOpplysninger?.length) {
                return 'Du må velge minst ett av alternativene';
            }
        }
    },
    sykmeldtFra: (state) => {
        if (!state.sykmeldtFra) {
            return 'Du må svare på hvor du er sykmeldt fra';
        }
    },
};

interface FormProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
}

const Form = ({ sykmelding, arbeidsgivere }: FormProps) => {
    const { formState, errors, setFormState, handleSubmit } = useForm<Form>({ validationFunctions });

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
                onChange={(event, value) => {
                    setFormState(
                        (state): Partial<Form> => ({ ...state, opplysningeneErRiktige: value === 'Ja' ? true : false }),
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
                    feil={errors.get('uriktigeOpplysninger')?.feilmelding}
                    checkboxes={[
                        {
                            label: 'Diagnose',
                            checked: formState.uriktigeOpplysninger?.includes('DIAGNOSE'),
                            value: 'DIAGNOSE',
                            id: 'uriktigeOpplysninger',
                        },
                        {
                            label: 'Periode',
                            checked: formState.uriktigeOpplysninger?.includes('PERIODE'),
                            value: 'PERIODE',
                        },
                        { label: 'Annet', checked: formState.uriktigeOpplysninger?.includes('ANNET'), value: 'ANNET' },
                    ]}
                    onChange={(event, value) => {
                        let updatedArray = formState.uriktigeOpplysninger ? [...formState.uriktigeOpplysninger] : [];
                        const shouldRemoveValue = updatedArray.includes(value);
                        if (shouldRemoveValue) {
                            updatedArray = updatedArray.filter((opplysning) => opplysning !== value);
                        } else {
                            updatedArray.push(value);
                        }
                        setFormState((state): Partial<Form> => ({ ...state, uriktigeOpplysninger: updatedArray }));
                    }}
                />
            )}

            <RadioPanelGruppe
                legend={'Hvor er du sykmeldt fra?'}
                name="sykmeldtFra"
                className="margin-bottom--2"
                feil={errors.get('sykmeldtFra')?.feilmelding}
                checked={(() => {
                    if (formState.sykmeldtFra === 'FRILANSER') {
                        return 'FRILANSER';
                    } else if (formState.sykmeldtFra === 'ARBEIDSGIVER') {
                        return 'ARBEIDSGIVER';
                    } else if (formState.sykmeldtFra === 'ANNET') {
                        return 'ANNET';
                    }
                    return undefined;
                })()}
                radios={[
                    {
                        label: 'Frilanser',
                        checked: formState.sykmeldtFra === 'FRILANSER',
                        value: 'FRILANSER',
                        id: 'sykmeldtFra',
                    },
                    {
                        label: 'Arbeidsgiver',
                        checked: formState.sykmeldtFra === 'ARBEIDSGIVER',
                        value: 'ARBEIDSGIVER',
                    },
                    { label: 'Annet', checked: formState.sykmeldtFra === 'ANNET', value: 'ANNET' },
                ]}
                onChange={(event, value) => {
                    const val = (() => {
                        if (formState.sykmeldtFra === 'FRILANSER') {
                            return 'FRILANSER';
                        } else if (formState.sykmeldtFra === 'ARBEIDSGIVER') {
                            return 'ARBEIDSGIVER';
                        } else if (formState.sykmeldtFra === 'ANNET') {
                            return 'ANNET';
                        }
                        return undefined;
                    })();
                    setFormState((state): Partial<Form> => ({ ...state, sykmeldtFra: val }));
                }}
            />
            {!!errors.size && (
                <Feiloppsummering className="margin-bottom--2" tittel="feil" feil={Array.from(errors.values())} />
            )}
            <Knapp type="hoved" className="margin-bottom--2">
                Submit
            </Knapp>
        </form>
    );
};

export default Form;
