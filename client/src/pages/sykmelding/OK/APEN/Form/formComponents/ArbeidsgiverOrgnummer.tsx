import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';
import NyNarmesteLeder from './NyNarmesteLeder';

interface ArbeidsgiverOrgnummerProps {
    brukerinformasjon: Brukerinformasjon;
}

const ArbeidsgiverOrgnummer: React.FC<ArbeidsgiverOrgnummerProps> = ({ brukerinformasjon }) => {
    const { control, watch } = useFormContext<FormData>();
    const watchArbeidsgiverOrgnummer = watch('arbeidsgiverOrgnummer');

    const { arbeidsgivere } = brukerinformasjon;

    return (
        <>
            <Controller
                control={control}
                name="arbeidsgiverOrgnummer"
                defaultValue={null}
                rules={{ required: true }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend="Min arbeidsgiver"
                        radios={arbeidsgivere.map((arbeidsgiver) => ({
                            label: arbeidsgiver.navn,
                            value: arbeidsgiver.orgnummer,
                            id: `arbeidsgiverOrgnummer-${arbeidsgiver.orgnummer}`,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {/* TODO: slik ser sykmeldingen ut for arbeidsgiveren din */}

            {/* TODO: make typesafe */}
            {watchArbeidsgiverOrgnummer && (
                <NyNarmesteLeder
                    arbeidsgiver={arbeidsgivere.find((ag) => ag.orgnummer === watchArbeidsgiverOrgnummer)!}
                />
            )}
        </>
    );
};

export default ArbeidsgiverOrgnummer;
