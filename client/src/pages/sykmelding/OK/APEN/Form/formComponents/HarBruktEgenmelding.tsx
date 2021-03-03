import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import Egenmeldingsperioder from './Egenmeldingsperioder';
import QuestionWrapper from '../layout/QuestionWrapper';

interface HarBruktEgenmeldingProps {
    syketilfelleStartdato: Date;
}

const HarBruktEgenmelding: React.FC<HarBruktEgenmeldingProps> = ({ syketilfelleStartdato }) => {
    const { control, watch } = useFormContext<FormData>();
    const watchHarBruktEgenmelding = watch('harBruktEgenmelding');

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name="harBruktEgenmelding"
                defaultValue={null}
                rules={{ required: true }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={`Vi har registrert at du ble syk ${syketilfelleStartdato.toString()}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`}
                        radios={[
                            { label: 'Ja', value: 'JA', id: 'harBruktEgenmelding-ja' },
                            { label: 'Nei', value: 'NEI', id: 'harBruktEgenmelding-nei' },
                        ]}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchHarBruktEgenmelding === 'JA' && (
                <Egenmeldingsperioder syketilfelleStartdato={syketilfelleStartdato} />
            )}
        </QuestionWrapper>
    );
};

export default HarBruktEgenmelding;
