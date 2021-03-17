import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData, JaEllerNeiType } from '../Form';
import UriktigeOpplysninger from './UriktigeOpplysninger';
import Arbeidssituasjon from './Arbeidssituasjon';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';
import QuestionWrapper from '../layout/QuestionWrapper';

interface ErOpplysningeneRiktigeProps {
    erUtenforVentetid: boolean;
    brukerinformasjon: Brukerinformasjon;
}

const ErOpplysningeneRiktige: React.FC<ErOpplysningeneRiktigeProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { register, unregister, control, watch, errors } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'erOpplysnigeneRiktige';
    const watchErOpplysningeneRiktige = watch(fieldName);

    useEffect(() => {
        register({
            name: 'erOpplysnigeneRiktige.sporsmal',
            value: 'Du må svare på om opplysningene stemmer.',
        });
        register({
            name: 'erOpplysnigeneRiktige.svartekster',
            value: JSON.stringify(JaEllerNeiType),
        });
        return () => unregister('erOpplysnigeneRiktige');
    }, [register, unregister]);

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
                        legend="Er opplysningene i sykmeldingen riktige"
                        radios={[
                            { label: 'Ja', value: 'JA', id: fieldName },
                            { label: 'Nei', value: 'NEI' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.erOpplysnigeneRiktige?.svar?.message}
                    />
                )}
            />

            {watchErOpplysningeneRiktige?.svar === 'NEI' && <UriktigeOpplysninger />}

            {Boolean(watchErOpplysningeneRiktige?.svar) && (
                <Arbeidssituasjon erUtenforVentetid={erUtenforVentetid} brukerinformasjon={brukerinformasjon} />
            )}
        </QuestionWrapper>
    );
};

export default ErOpplysningeneRiktige;
