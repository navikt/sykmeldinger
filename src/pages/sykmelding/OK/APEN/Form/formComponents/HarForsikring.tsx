import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData, JaEllerNeiType } from '../Form';
import QuestionWrapper from '../layout/QuestionWrapper';

const HarForsikring: React.FC = () => {
    const { control, register, unregister } = useFormContext<FormData>();
    const sporsmaltekst = 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?';
    const fieldName: keyof FormData = 'harForsikring';

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
                rules={{ required: 'du må svare på om du har hatt forsikring.' }}
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
                    />
                )}
            />
        </QuestionWrapper>
    );
};

export default HarForsikring;
