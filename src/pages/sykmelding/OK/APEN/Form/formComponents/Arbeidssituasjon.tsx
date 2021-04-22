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
            <Spacing>
                <Spacing amount="x-small">
                    <Systemtittel tag="h2">Ditt arbeidsfohold</Systemtittel>
                </Spacing>
                <Spacing amount="x-small">
                    <Normaltekst>
                        For å vite hvem som skal utbetale hva, må vi vite mer om arbeidssituasjonen din. Velg et av
                        alternativene under.
                    </Normaltekst>
                </Spacing>
                <Ekspanderbar title="Om du har flere arbeidsforhold">
                    Er du sykmeldt fra flere arbeidsforhold må du ha én sykmelding per forhold. Trenger du flere
                    sykmeldinger, må du kontakte den som har sykmeldt deg.
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

            {skalViseEgenmeldingsperioderSporsmal && (
                <HarBruktEgenmelding syketilfelleStartdato={new Date('2021-04-20')} />
            )}

            {skalViseForsikringSporsmal && <HarForsikring />}
        </QuestionWrapper>
    );
};

export default Arbeidssituasjon;
