import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, ArbeidssituasjonType } from '../Form';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';
import Brukerinformasjon from '../../../../../../models/Brukerinformasjon';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import HarForsikring from './HarForsikring';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const StrengtFortroligInfo = () => (
    <AlertStripeAdvarsel style={{ marginTop: '2rem' }}>
        <Normaltekst>
            Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til
            arbeidsgiveren din fra nav.no. Det betyr at du må levere sykmeldingen personlig til arbeidsgiveren din.
        </Normaltekst>
        <Normaltekst>For å levere sykmeldingen manuelt kan du:</Normaltekst>
        <ul>
            <li>ta kontakt med den som har sykmeldt deg for å få en utskrift</li>
            <li>skrive ut sykmeldingen og levere til arbeidsgiveren din</li>
        </ul>
    </AlertStripeAdvarsel>
);

interface ArbeidssituasjonProps {
    erUtenforVentetid: boolean;
    brukerinformasjon: Brukerinformasjon;
}

const Arbeidssituasjon: React.FC<ArbeidssituasjonProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { register, unregister, errors, control, watch } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'arbeidssituasjon';
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
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister]);

    const skalViseEgenmeldingsperioderSporsmal = useMemo(() => {
        if (!watchArbeidssituasjon?.svar) return false;

        // Only FL and SN within ventetid
        return (
            ['FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    const skalViseForsikringSporsmal = useMemo(() => {
        if (!watchArbeidssituasjon?.svar) return false;

        // Only FL and SN within ventetid
        return (
            ['FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    return (
        <QuestionWrapper innrykk>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{ required: 'arbeidssituasjon mangler.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={Object.entries(ArbeidssituasjonType).map(([key, label], index) => ({
                            label: label,
                            value: key,
                            id: index === 0 ? fieldName : undefined,
                        }))}
                        checked={value}
                        onChange={(_e, value) => onChange(value)}
                        feil={errors.arbeidssituasjon?.svar?.message}
                    />
                )}
            />
            {watchArbeidssituasjon?.svar === 'ARBEIDSTAKER' && brukerinformasjon.strengtFortroligAdresse && (
                <StrengtFortroligInfo />
            )}

            {watchArbeidssituasjon?.svar === 'ARBEIDSTAKER' && !brukerinformasjon.strengtFortroligAdresse && (
                <ArbeidsgiverOrgnummer brukerinformasjon={brukerinformasjon} />
            )}

            {skalViseEgenmeldingsperioderSporsmal && (
                <HarBruktEgenmelding syketilfelleStartdato={new Date('2021-04-20')} />
            )}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </QuestionWrapper>
    );
};

export default Arbeidssituasjon;
