import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Alert, BodyLong, BodyShort, Heading, Label, Link, Radio, RadioGroup, ReadMore } from '@navikt/ds-react';

import { FormShape, ArbeidssituasjonType } from '../Form';
import {
    BrukerinformasjonFragment,
    SykmeldingUtenforVentetidFragment,
} from '../../../../../../fetching/graphql.generated';
import QuestionWrapper from '../layout/QuestionWrapper';
import Spacing from '../../../../../Spacing/Spacing';
import { useAmplitude } from '../../../../../../amplitude/amplitude';

import HarForsikring from './HarForsikring';
import HarBruktEgenmelding from './HarBruktEgenmelding';
import ArbeidsgiverOrgnummer from './ArbeidsgiverOrgnummer';

const StrengtFortroligInfo = (): JSX.Element => (
    <Alert variant="warning">
        <Spacing amount="small">
            <BodyLong>
                Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til
                arbeidsgiveren din fra nav.no. Det betyr at du må levere sykmeldingen personlig til arbeidsgiveren din.
            </BodyLong>
        </Spacing>
        <Label>
            For å levere sykmeldingen til arbeidsgiveren din kan du ta kontakt med den som har sykmeldt deg for å få en
            utskrift.
        </Label>
    </Alert>
);

interface ArbeidssituasjonProps {
    harAvventendePeriode: boolean;
    erUtenforVentetid: SykmeldingUtenforVentetidFragment;
    brukerinformasjon: BrukerinformasjonFragment;
    sykmeldingFom: string;
}

const fieldName = 'arbeidssituasjon';
const sporsmaltekst = 'Jeg er sykmeldt som';

const Arbeidssituasjon = ({
    harAvventendePeriode,
    erUtenforVentetid,
    brukerinformasjon,
    sykmeldingFom,
}: ArbeidssituasjonProps): JSX.Element => {
    const logEvent = useAmplitude();
    const { register, unregister, control, watch } = useFormContext<FormShape>();
    const watchArbeidssituasjon = watch(fieldName);

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        });
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify(ArbeidssituasjonType),
        });

        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
    }, [register, unregister]);

    const skalViseEgenmeldingsperioderSporsmal =
        watchArbeidssituasjon?.svar &&
        ['FRILANSER', 'NAERINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
        !erUtenforVentetid.erUtenforVentetid;

    const skalViseForsikringSporsmal =
        watchArbeidssituasjon?.svar &&
        ['FRILANSER', 'NAERINGSDRIVENDE'].includes(watchArbeidssituasjon.svar) &&
        !erUtenforVentetid.erUtenforVentetid;

    return (
        <QuestionWrapper innrykk>
            <Spacing>
                <Heading size="medium" spacing>
                    Din arbeidssituasjon
                </Heading>
                <BodyShort spacing>
                    Fortell oss hva som er situasjonen din, så vet vi hvilken informasjon du skal få
                </BodyShort>
                <ReadMore header="Har du flere arbeidsforhold?">
                    Du trenger én sykmelding for hvert arbeidsforhold du er sykmeldt fra. Kontakt den som har sykmeldt
                    deg.
                </ReadMore>
            </Spacing>

            <Controller
                control={control}
                name={`${fieldName}.svar`}
                rules={{ required: 'Du må svare på hvilket arbeid du er sykmeldt fra.' }}
                defaultValue={null}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={sporsmaltekst}
                        onChange={(value: keyof typeof ArbeidssituasjonType) => {
                            logEvent({
                                eventName: 'skjema spørsmål besvart',
                                data: { skjemanavn: 'arbeidssituasjon', spørsmål: 'Jeg er sykmeldt som', svar: value },
                            });
                            field.onChange(value);
                        }}
                        error={fieldState.error?.message}
                    >
                        {Object.entries(ArbeidssituasjonType).map(([key, label]) => (
                            <Radio
                                key={key}
                                value={key}
                                disabled={harAvventendePeriode && label !== ArbeidssituasjonType.ARBEIDSTAKER}
                            >
                                {label}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
            />
            <Spacing direction="top">
                <BodyLong>
                    Sjekk om du er{' '}
                    <Link
                        href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/er-jeg-selvstendig-naeringsdrivende-frilanser-eller-arbeidstaker"
                        target="_blank"
                    >
                        selvstendig næringsdrivende, frilanser eller ansatt
                    </Link>
                </BodyLong>
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
