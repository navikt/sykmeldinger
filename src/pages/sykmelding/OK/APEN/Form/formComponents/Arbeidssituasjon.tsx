import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormShape, ArbeidssituasjonType } from '../Form';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';
import Brukerinformasjon from '../../../../../../models/Brukerinformasjon';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import HarForsikring from './HarForsikring';
import QuestionWrapper from '../layout/QuestionWrapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spacing from '../../../../../commonComponents/Spacing/Spacing';
import Ekspanderbar from '../../../../../commonComponents/Ekspanderbar/Ekspanderbar';
import ErUtenforVentetid from '../../../../../../models/ErUtenforVentetid';

const StrengtFortroligInfo = () => (
    <AlertStripeAdvarsel style={{ marginTop: '2rem' }}>
        <Normaltekst>
            Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til
            arbeidsgiveren din fra nav.no. Det betyr at du må levere sykmeldingen personlig til arbeidsgiveren din.
        </Normaltekst>
        <Normaltekst>For å levere sykmeldingen manuelt kan du:</Normaltekst>
        <ul>
            <Normaltekst tag="li">ta kontakt med den som har sykmeldt deg for å få en utskrift</Normaltekst>
            <Normaltekst tag="li">skrive ut sykmeldingen og levere til arbeidsgiveren din</Normaltekst>
        </ul>
    </AlertStripeAdvarsel>
);

interface ArbeidssituasjonProps {
    erUtenforVentetid: ErUtenforVentetid;
    brukerinformasjon: Brukerinformasjon;
}

const Arbeidssituasjon: React.FC<ArbeidssituasjonProps> = ({ erUtenforVentetid, brukerinformasjon }) => {
    const { register, unregister, errors, control, watch } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'arbeidssituasjon';
    const sporsmaltekst = 'Jeg er sykmeldt som';
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
            erUtenforVentetid.erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    const skalViseForsikringSporsmal = useMemo(() => {
        if (!watchArbeidssituasjon?.svar) return false;

        // Only FL and SN within ventetid
        return (
            ['FRILANSER', 'SELVSTENDIG_NARINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            erUtenforVentetid.erUtenforVentetid === false
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    return (
        <QuestionWrapper innrykk>
            <Spacing>
                <Spacing amount="x-small">
                    <Systemtittel tag="h2">Arbeidet du er sykmeldt fra</Systemtittel>
                </Spacing>
                <Spacing amount="x-small">
                    <Normaltekst>
                        Fortell oss hva som er situasjonen din, så vet vi hvilken informasjon du skal få
                    </Normaltekst>
                </Spacing>
                <Ekspanderbar title="Har du flere arbeidsforhold?">
                    Du trenger én sykmelding for hvert arbeidsforhold du er sykmeldt fra. Kontakt den som har sykmeldt
                    deg.
                </Ekspanderbar>
            </Spacing>

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

            {skalViseEgenmeldingsperioderSporsmal && !!erUtenforVentetid.oppfolgingsdato && (
                <HarBruktEgenmelding oppfolgingsdato={erUtenforVentetid.oppfolgingsdato} />
            )}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </QuestionWrapper>
    );
};

export default Arbeidssituasjon;
