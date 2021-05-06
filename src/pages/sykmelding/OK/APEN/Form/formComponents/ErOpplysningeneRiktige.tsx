import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import UriktigeOpplysninger from './UriktigeOpplysninger';
import QuestionWrapper from '../layout/QuestionWrapper';

const ErOpplysningeneRiktige: React.FC = () => {
    const { register, unregister, control, watch, errors } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'erOpplysningeneRiktige';
    const sporsmaltekst = 'Er opplysningene riktige';
    const watchErOpplysningeneRiktige = watch(fieldName);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(JaEllerNeiType),
        });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister, sporsmaltekst]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={fieldName + '.svar'}
                defaultValue={null}
                rules={{ required: 'Du må svare på om opplysningene i sykmeldingen er riktige.' }}
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
                        feil={errors.erOpplysningeneRiktige?.svar?.message}
                    />
                )}
            />

            {watchErOpplysningeneRiktige?.svar === 'NEI' && <UriktigeOpplysninger />}
        </QuestionWrapper>
    );
};

export default ErOpplysningeneRiktige;
