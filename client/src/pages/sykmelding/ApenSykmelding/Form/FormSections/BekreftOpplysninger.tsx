import React from 'react';
import { FormInputs, FeilaktigeOpplysninger } from '../../../../../types/form';
import { FeiloppsummeringFeil, RadioPanelGruppe, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import './FormSections.less';
import { Systemtittel } from 'nav-frontend-typografi';
import FormInfoMessage from '../Components/FormInfoMessage';
import FeilaktigeOpplysningerInfo from '../Components/FeilaktigeOpplysningerInfo';

interface BekreftOpplysningerProps {
    formState: Partial<FormInputs>;
    errors: Map<keyof FormInputs, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<Partial<FormInputs>>>;
}

const BekreftOpplysninger = ({ formState, errors, setFormState }: BekreftOpplysningerProps) => {
    return (
        <div className="form-section">
            <Systemtittel className="margin-bottom--1">Bekreft Opplysninger</Systemtittel>

            <RadioPanelGruppe
                name="opplysningeneErRiktige"
                className="panelgruppe"
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
                            feilaktigeOpplysninger: undefined,
                        }),
                    );
                }}
                radios={[
                    { label: 'Ja', value: 'Ja', id: 'opplysningeneErRiktige' },
                    { label: 'Nei', value: 'Nei' },
                ]}
            />
            <FormInfoMessage message="Å bekrefte sykmeldingen betyr at du er enig i innholdet, og at du ønsker å ta den i bruk." />

            {formState.opplysningeneErRiktige === false && (
                <>
                    <CheckboksPanelGruppe
                        legend={'Hvilke opplysninger stemmer ikke?'}
                        className="panelgruppe"
                        feil={errors.get('feilaktigeOpplysninger')?.feilmelding}
                        checkboxes={[
                            {
                                label: FeilaktigeOpplysninger.PERIODE,
                                checked: formState.feilaktigeOpplysninger?.includes('PERIODE'),
                                value: 'PERIODE',
                                id: 'feilaktigeOpplysninger',
                            },
                            {
                                label: FeilaktigeOpplysninger.SYKMELDINGSGRAD_LAV,
                                checked: formState.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_LAV'),
                                value: 'SYKMELDINGSGRAD_LAV',
                            },
                            {
                                label: FeilaktigeOpplysninger.SYKMELDINGSGRAD_HOY,
                                checked: formState.feilaktigeOpplysninger?.includes('SYKMELDINGSGRAD_HOY'),
                                value: 'SYKMELDINGSGRAD_HOY',
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

                    <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={formState.feilaktigeOpplysninger} />
                </>
            )}
        </div>
    );
};

export default BekreftOpplysninger;
