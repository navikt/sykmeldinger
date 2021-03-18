import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData, ArbeidssituasjonType } from '../Form';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import HarForsikring from './HarForsikring';
import QuestionWrapper from '../layout/QuestionWrapper';

interface ArbeidssituasjonProps {
    erUtenforVentetid: boolean;
    brukerinformasjon: Brukerinformasjon;
}

const Arbeidssituasjon: React.FC<ArbeidssituasjonProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { register, unregister, errors, control, watch } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'arbeidssituasjon';
    const sporsmaltekst = 'Min arbeidssituasjon';
    const watchArbeidssituasjon = watch(fieldName);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(ArbeidssituasjonType),
        });
        return () => unregister(fieldName);
    }, [register, unregister]);

    const skalViseEgenmeldingsperioderSporsmal = useMemo(() => {
        if (watchArbeidssituasjon?.svar === undefined) return false;

        // Only Arbeidstaker, FL and SN within arbeidsgiverperiode/ventetid
        return (
            ['ARBEIDSTAKER', 'FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    const skalViseForsikringSporsmal = useMemo(() => {
        if (watchArbeidssituasjon?.svar === undefined) return false;

        // Only FL and SN within ventetid
        return (
            ['FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    return (
        <QuestionWrapper backgroundColor="#E4EDF2">
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{ required: 'arbeidssituasjon mangler.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={Object.entries(ArbeidssituasjonType)
                            .filter(([key]) => !(brukerinformasjon.diskresjonskode === true && key === 'ARBEIDSTAKER'))
                            .map(([key, label], index) => ({
                                label: label,
                                value: key,
                                id: index === 0 ? fieldName : undefined,
                            }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.arbeidssituasjon?.svar?.message}
                    />
                )}
            />

            {watchArbeidssituasjon?.svar === 'ARBEIDSTAKER' && (
                <ArbeidsgiverOrgnummer brukerinformasjon={brukerinformasjon} />
            )}

            {skalViseEgenmeldingsperioderSporsmal && <HarBruktEgenmelding syketilfelleStartdato={new Date()} />}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </QuestionWrapper>
    );
};

export default Arbeidssituasjon;
