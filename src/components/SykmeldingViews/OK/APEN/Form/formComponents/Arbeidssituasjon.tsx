import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

import { FormShape, ArbeidssituasjonType } from '../Form';
import { Brukerinformasjon } from '../../../../../../models/Brukerinformasjon';
import QuestionWrapper from '../layout/QuestionWrapper';
import Spacing from '../../../../../Spacing/Spacing';
import Ekspanderbar from '../../../../../Ekspanderbar/Ekspanderbar';
import { ErUtenforVentetid } from '../../../../../../models/ErUtenforVentetid';

import HarForsikring from './HarForsikring';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';

const StrengtFortroligInfo = (): JSX.Element => (
    <AlertStripeAdvarsel>
        <Spacing amount="small">
            <Normaltekst>
                Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til
                arbeidsgiveren din fra nav.no. Det betyr at du må levere sykmeldingen personlig til arbeidsgiveren din.
            </Normaltekst>
        </Spacing>
        <Normaltekst>
            For å levere sykmeldingen til arbeidsgiveren din kan du ta kontakt med den som har sykmeldt deg for å få en
            utskrift.
        </Normaltekst>
    </AlertStripeAdvarsel>
);

interface ArbeidssituasjonProps {
    harAvventendePeriode: boolean;
    erUtenforVentetid: ErUtenforVentetid;
    brukerinformasjon: Brukerinformasjon;
    sykmeldingFom: string;
}

const Arbeidssituasjon = ({
    harAvventendePeriode,
    erUtenforVentetid,
    brukerinformasjon,
    sykmeldingFom,
}: ArbeidssituasjonProps): JSX.Element => {
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
        return (
            ['FRILANSER', 'NAERINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            !erUtenforVentetid.erUtenforVentetid
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    const skalViseForsikringSporsmal = useMemo(() => {
        if (!watchArbeidssituasjon?.svar) return false;
        return (
            ['FRILANSER', 'NAERINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
            !erUtenforVentetid.erUtenforVentetid
        );
    }, [watchArbeidssituasjon, erUtenforVentetid]);

    return (
        <QuestionWrapper innrykk>
            <Spacing>
                <Spacing amount="x-small">
                    <Systemtittel tag="h2">Din arbeidssituasjon</Systemtittel>
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
                rules={{ required: 'Du må svare på hvilket arbeid du er sykmeldt fra.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={Object.entries(ArbeidssituasjonType).map(([key, label], index) => ({
                            label: label,
                            value: key,
                            id: index === 0 ? fieldName : undefined,
                            disabled: harAvventendePeriode && label !== ArbeidssituasjonType.ARBEIDSTAKER,
                        }))}
                        checked={value}
                        onChange={(_e, value) => onChange(value)}
                        feil={errors.arbeidssituasjon?.svar?.message}
                    />
                )}
            />
            <Spacing direction="top">
                <Normaltekst>
                    Sjekk om du er{' '}
                    <Lenke
                        href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/er-jeg-selvstendig-naeringsdrivende-frilanser-eller-arbeidstaker"
                        target="_blank"
                    >
                        selvstendig næringsdrivende, frilanser eller ansatt
                    </Lenke>
                </Normaltekst>
            </Spacing>
            {watchArbeidssituasjon?.svar === 'ARBEIDSTAKER' && brukerinformasjon.strengtFortroligAdresse && (
                <Spacing direction="top">
                    <StrengtFortroligInfo />
                </Spacing>
            )}

            {watchArbeidssituasjon?.svar === 'ARBEIDSTAKER' && !brukerinformasjon.strengtFortroligAdresse && (
                <ArbeidsgiverOrgnummer brukerinformasjon={brukerinformasjon} />
            )}

            {skalViseEgenmeldingsperioderSporsmal && (
                <HarBruktEgenmelding oppfolgingsdato={erUtenforVentetid.oppfolgingsdato || sykmeldingFom} />
            )}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </QuestionWrapper>
    );
};

export default Arbeidssituasjon;