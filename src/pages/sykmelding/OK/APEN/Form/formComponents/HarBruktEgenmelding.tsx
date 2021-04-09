import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, JaEllerNeiType } from '../Form';
import Egenmeldingsperioder from './Egenmeldingsperioder';
import QuestionWrapper from '../layout/QuestionWrapper';
import dayjs from 'dayjs';

interface HarBruktEgenmeldingProps {
    syketilfelleStartdato: Date;
}

const HarBruktEgenmelding: React.FC<HarBruktEgenmeldingProps> = ({ syketilfelleStartdato }) => {
    const { control, watch, errors, register, unregister } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'harBruktEgenmelding';
    const sporsmaltekst = `Vi har registrert at du ble syk ${dayjs(syketilfelleStartdato).format(
        'D. MMMM YYYY',
    )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`;
    const watchHarBruktEgenmelding = watch(fieldName);

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
                rules={{ required: 'Du må svare på om du har brukt egenmelding.' }}
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
                        feil={errors.harBruktEgenmelding?.svar?.message}
                    />
                )}
            />

            {watchHarBruktEgenmelding?.svar === 'JA' && (
                <Egenmeldingsperioder syketilfelleStartdato={syketilfelleStartdato} />
            )}
        </QuestionWrapper>
    );
};

export default HarBruktEgenmelding;
