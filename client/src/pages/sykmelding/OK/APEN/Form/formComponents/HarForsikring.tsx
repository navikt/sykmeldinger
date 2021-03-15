import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const HarForsikring: React.FC = () => {
    const { control } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'harForsikring';

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={fieldName}
                defaultValue={null}
                rules={{ required: 'du må svare på om du har hatt forsikring.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend="Har du forsikring som gjelder for de første 16 dagene av sykefraværet?"
                        radios={[
                            { label: 'Ja', value: 'JA', id: 'harForsikring-ja' },
                            { label: 'Nei', value: 'NEI', id: 'harForsikring-nei' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />
        </QuestionWrapper>
    );
};

export default HarForsikring;
