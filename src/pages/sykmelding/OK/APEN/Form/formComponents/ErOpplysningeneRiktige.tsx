import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData, JaEllerNeiType } from '../Form';
import UriktigeOpplysninger from './UriktigeOpplysninger';
import QuestionWrapper from '../layout/QuestionWrapper';

const ErOpplysningeneRiktige: React.FC = () => {
    const { register, unregister, control, watch, errors } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'erOpplysnigeneRiktige';
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
        return () => unregister(fieldName);
    }, [register, unregister, sporsmaltekst]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={fieldName + '.svar'}
                defaultValue={null}
                rules={{ required: 'Du må svare på om opplysningene stemmer' }}
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
                        feil={errors.erOpplysnigeneRiktige?.svar?.message}
                    />
                )}
            />

            {watchErOpplysningeneRiktige?.svar === 'NEI' && <UriktigeOpplysninger />}
        </QuestionWrapper>
    );
};

export default ErOpplysningeneRiktige;
