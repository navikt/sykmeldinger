import React, { useContext } from 'react';
import { Button, Loader } from '@navikt/ds-react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useForm, FormProvider } from 'react-hook-form';

import useExtraFormData from '../../../../../hooks/useExtraFormData';
import Spinner from '../../../../Spinner/Spinner';
import { AvbrytContext } from '../AvbrytContext';
import Sykmeldingsopplysninger from '../../../SykmeldingView/SykmeldingsopplysningerContainer';
import Spacing from '../../../../Spacing/Spacing';
import useGetSykmeldingIdParam from '../../../../../hooks/useGetSykmeldingIdParam';
import { getSykmeldingStartDate } from '../../../../../utils/sykmeldingUtils';
import { Periodetype, SykmeldingFragment } from '../../../../../fetching/graphql.generated';
import { useSubmitSykmelding } from '../../../../../hooks/useMutations';
import { useAmplitude, useLogAmplitudeEvent } from '../../../../../amplitude/amplitude';

import ErOpplysningeneRiktige from './formComponents/ErOpplysningeneRiktige';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import Arbeidssituasjon from './formComponents/Arbeidssituasjon';
import styles from './Form.module.css';
import VeilederSenderSykmeldingen from './formComponents/VeilederSenderSykmeldingen';

export interface Egenmeldingsperiode {
    fom: string;
    tom: string;
}

export enum UriktigeOpplysningerType {
    PERIODE = 'Periode',
    SYKMELDINGSGRAD_FOR_LAV = 'Sykmeldingsgraden er for lav',
    SYKMELDINGSGRAD_FOR_HOY = 'Sykmeldingsgraden er for høy',
    ARBEIDSGIVER = 'Arbeidsgiver',
    DIAGNOSE = 'Diagnose',
    ANDRE_OPPLYSNINGER = 'Andre opplysninger',
}

export enum ArbeidssituasjonType {
    ARBEIDSTAKER = 'ansatt',
    FRILANSER = 'frilanser',
    NAERINGSDRIVENDE = 'selvstendig næringsdrivende',
    ARBEIDSLEDIG = 'arbeidsledig eller permittert',
    ANNET = 'annet',
}

export enum JaEllerNeiType {
    JA = 'Ja',
    NEI = 'Nei',
}

interface SporsmalSvar<Value> {
    sporsmaltekst?: string;
    svartekster?: string;
    svar?: Value;
}

export interface FormShape {
    erOpplysningeneRiktige?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    uriktigeOpplysninger?: SporsmalSvar<(keyof typeof UriktigeOpplysningerType)[]>;
    arbeidssituasjon?: SporsmalSvar<keyof typeof ArbeidssituasjonType>;
    arbeidsgiverOrgnummer?: SporsmalSvar<string>;
    riktigNarmesteLeder?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    harBruktEgenmelding?: SporsmalSvar<keyof typeof JaEllerNeiType>;
    egenmeldingsperioder?: SporsmalSvar<Egenmeldingsperiode[]>;
    harForsikring?: SporsmalSvar<keyof typeof JaEllerNeiType>;
}

interface FormProps {
    sykmelding: SykmeldingFragment;
    disable: boolean;
}

function Form({ sykmelding, disable }: FormProps): JSX.Element {
    const skjemanavn = !sykmelding.papirsykmelding ? 'åpen sykmelding' : 'åpen papirsykmelding';

    const logEvent = useAmplitude();
    useLogAmplitudeEvent(
        { eventName: 'skjema åpnet', data: { skjemanavn } },
        { 'har eldre sykmelding': disable ? 'Ja' : 'Nei' },
    );

    const sykmeldingId = useGetSykmeldingIdParam();

    const { data, error, loading } = useExtraFormData(sykmeldingId);
    const [{ loading: fetchingSend, error: errorSend }, send] = useSubmitSykmelding(
        sykmeldingId,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    );

    const formMethods = useForm<FormShape>({ shouldFocusError: false });
    const { handleSubmit, watch, errors } = formMethods;

    const erArbeidstaker = watch('arbeidssituasjon')?.svar === 'ARBEIDSTAKER';
    const erArbeidstakerMedStrengtFortroligAdressse =
        erArbeidstaker && data?.brukerinformasjon?.strengtFortroligAdresse === true;
    const harValgtArbeidsgiver = !!watch('arbeidsgiverOrgnummer')?.svar;

    const watchErOpplysningeneRiktige = watch('erOpplysningeneRiktige');

    const { maAvbryte } = useContext(AvbrytContext);

    if (loading) {
        return (
            <Spacing amount="large">
                <Spinner headline="Henter arbeidsforhold" />
            </Spacing>
        );
    }

    if (error || data?.brukerinformasjon == null || data?.sykmeldingUtenforVentetid == null) {
        return (
            <Spacing>
                <AlertStripeFeil role="alert" aria-live="polite">
                    Vi klarte dessverre ikke å hente opp informasjonen som trengs for at du kan bruke sykmeldingen.
                    Vennligst prøv igjen senere.
                </AlertStripeFeil>
            </Spacing>
        );
    }

    return (
        <FormProvider {...formMethods}>
            <form
                id="apen-sykmelding-form"
                className="hide-on-print"
                onSubmit={handleSubmit((data) => {
                    send(data);
                })}
            >
                <Spacing>
                    <ErOpplysningeneRiktige disable={disable} />

                    {Boolean(watchErOpplysningeneRiktige?.svar) && !maAvbryte && (
                        <Arbeidssituasjon
                            harAvventendePeriode={sykmelding.sykmeldingsperioder.some(
                                (sm) => sm.type === Periodetype.Avventende,
                            )}
                            erUtenforVentetid={data.sykmeldingUtenforVentetid}
                            brukerinformasjon={data.brukerinformasjon}
                            sykmeldingFom={getSykmeldingStartDate(sykmelding)}
                        />
                    )}

                    {erArbeidstaker && harValgtArbeidsgiver && !data.brukerinformasjon.strengtFortroligAdresse && (
                        <div className={styles.harValgtArbeidsgiverWrapper}>
                            <VeilederSenderSykmeldingen />
                            <Sykmeldingsopplysninger
                                sykmelding={sykmelding}
                                arbeidsgiver
                                expandable={true}
                                expandedDefault={false}
                            />
                        </div>
                    )}

                    {errorSend && (
                        <Spacing amount="small">
                            <AlertStripeFeil role="alert" aria-live="polite">
                                {errorSend.message}
                            </AlertStripeFeil>
                        </Spacing>
                    )}
                </Spacing>

                <Spacing>
                    <FeiloppsummeringContainer errors={errors} />
                </Spacing>

                {!maAvbryte && !erArbeidstakerMedStrengtFortroligAdressse && (
                    <Spacing>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                className={styles.sendBekreftButton}
                                disabled={fetchingSend || disable}
                                variant="primary"
                                type="submit"
                            >
                                {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding {fetchingSend && <Loader />}
                            </Button>
                        </div>
                    </Spacing>
                )}
            </form>
        </FormProvider>
    );
}

export default Form;
