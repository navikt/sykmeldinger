import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const HarForsikring: React.FC = () => {
    const { control, errors, register, unregister } = useFormContext<FormShape>();
    const sporsmaltekst = 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?';
    const fieldName: keyof FormShape = 'harForsikring';

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(JaEllerNeiType),
        });
        return () => unregister(fieldName);
    }, [register, unregister, sporsmaltekst]);
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
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={[
                            { label: JaEllerNeiType.JA, value: 'JA', id: fieldName },
                            { label: JaEllerNeiType.NEI, value: 'NEI' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.harForsikring?.svar?.message}
                    />
                )}
            />
        </QuestionWrapper>
    );
};

export default HarForsikring;
