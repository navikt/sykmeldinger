import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData, ArbeidssituasjonType } from '../Form';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import HarForsikring from './HarForsikring';

interface ArbeidssituasjonProps {
    erUtenforVentetid: boolean;
    brukerinformasjon: Brukerinformasjon;
}

const Arbeidssituasjon: React.FC<ArbeidssituasjonProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { control, watch } = useFormContext<FormData>();
    const watchArbeidssituasjon = watch('arbeidssituasjon');

    const skalViseEgenmeldingsperioderSporsmal = useMemo(() => {
        if (watchArbeidssituasjon === undefined) return false;

        // Only Arbeidstaker, FL and SN within arbeidsgiverperiode/ventetid
        return (
            ['ARBEIDSTAKER', 'FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon) &&
            erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon]);

    const skalViseForsikringSporsmal = useMemo(() => {
        if (watchArbeidssituasjon === undefined) return false;

        // Only FL and SN within ventetid
        return (
            ['FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon) && erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon]);

    return (
        <>
            <Controller
                control={control}
                name="arbeidssituasjon"
                defaultValue={null}
                rules={{ required: true }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend="Min arbeidssituasjon"
                        radios={Object.entries(ArbeidssituasjonType).map(([key, label]) => ({
                            label: label,
                            value: key,
                            id: `arbeidssituasjon-${key}`,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {watchArbeidssituasjon === 'ARBEIDSTAKER' && (
                <ArbeidsgiverOrgnummer brukerinformasjon={brukerinformasjon} />
            )}

            {skalViseEgenmeldingsperioderSporsmal && <HarBruktEgenmelding syketilfelleStartdato={new Date()} />}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </>
    );
};

export default Arbeidssituasjon;
