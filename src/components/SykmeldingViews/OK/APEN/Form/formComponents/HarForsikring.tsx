import { Radio, RadioGroup } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { FormShape, JaEllerNeiType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const fieldName = 'harForsikring';
const sporsmaltekst = 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?';

const HarForsikring: React.FC = () => {
    const { control, register, unregister } = useFormContext<FormShape>();

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        });
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify(JaEllerNeiType),
        });

        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{
                    required:
                        'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet.',
                }}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={sporsmaltekst}
                        onChange={(value: 'JA' | 'NEI') => field.onChange(value)}
                        error={fieldState.error?.message}
                    >
                        <Radio value="JA">Ja</Radio>
                        <Radio value="NEI">Nei</Radio>
                    </RadioGroup>
                )}
            />
        </QuestionWrapper>
    );
};

export default HarForsikring;
