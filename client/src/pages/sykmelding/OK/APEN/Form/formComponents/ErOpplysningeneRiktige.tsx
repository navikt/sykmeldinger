import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import UriktigeOpplysninger from './UriktigeOpplysninger';
import Arbeidssituasjon from './Arbeidssituasjon';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';

interface ErOpplysningeneRiktigeProps {
    erUtenforVentetid: boolean;
    brukerinformasjon: Brukerinformasjon;
}

const ErOpplysningeneRiktige: React.FC<ErOpplysningeneRiktigeProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { control, watch } = useFormContext<FormData>();
    const watchErOpplysningeneRiktige = watch('erOpplysnigeneRiktige');

    return (
        <>
            <Controller
                control={control}
                name="erOpplysnigeneRiktige"
                defaultValue={null}
                rules={{ required: true }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend="Er opplysningene i sykmeldingen riktige"
                        radios={[
                            { label: 'Ja', value: 'JA', id: 'erOpplysnigeneRiktige-ja' },
                            { label: 'Nei', value: 'NEI', id: 'erOpplysnigeneRiktige-nei' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchErOpplysningeneRiktige === 'NEI' && <UriktigeOpplysninger />}

            {Boolean(watchErOpplysningeneRiktige) && (
                <Arbeidssituasjon erUtenforVentetid={erUtenforVentetid} brukerinformasjon={brukerinformasjon} />
            )}
        </>
    );
};

export default ErOpplysningeneRiktige;
