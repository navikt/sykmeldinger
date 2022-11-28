import React, { useContext } from 'react'
import { Alert, Button } from '@navikt/ds-react'
import { useForm, FormProvider } from 'react-hook-form'

import useExtraFormData from '../../../../../hooks/useExtraFormData'
import Spinner from '../../../../Spinner/Spinner'
import { AvbrytContext } from '../AvbrytContext'
import Spacing from '../../../../Spacing/Spacing'
import useGetSykmeldingIdParam from '../../../../../hooks/useGetSykmeldingIdParam'
import { getSykmeldingStartDate } from '../../../../../utils/sykmeldingUtils'
import { Periodetype, SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { useSubmitSykmelding } from '../../../../../hooks/useMutations'
import { useAmplitude, useLogAmplitudeEvent } from '../../../../../amplitude/amplitude'
import SykmeldingArbeidsgiverContainer from '../../../SykmeldingView/SykmeldingArbeidsgiverContainer'

import ErOpplysningeneRiktige from './formComponents/ErOpplysningeneRiktige'
import FeiloppsummeringContainer from './FeiloppsummeringContainer'
import Arbeidssituasjon from './formComponents/Arbeidssituasjon'
import styles from './Form.module.css'
import VeilederSenderSykmeldingen from './formComponents/VeilederSenderSykmeldingen'

export type DateRange = {
    fom: Date | undefined
    tom: Date | undefined
}

export interface Egenmeldingsperiode {
    range: DateRange
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
    ARBEIDSLEDIG = 'arbeidsledig',
    PERMITTERT = 'permittert',
    ANNET = 'annet',
}

export enum JaEllerNeiType {
    JA = 'Ja',
    NEI = 'Nei',
}

interface SporsmalSvar<Value> {
    sporsmaltekst?: string
    svartekster?: string
    svar?: Value
}

export interface FormShape {
    erOpplysningeneRiktige?: SporsmalSvar<keyof typeof JaEllerNeiType | null>
    uriktigeOpplysninger?: SporsmalSvar<(keyof typeof UriktigeOpplysningerType)[]>
    arbeidssituasjon?: SporsmalSvar<keyof typeof ArbeidssituasjonType | null>
    arbeidsgiverOrgnummer?: SporsmalSvar<string | null>
    riktigNarmesteLeder?: SporsmalSvar<keyof typeof JaEllerNeiType | null>
    harBruktEgenmelding?: SporsmalSvar<keyof typeof JaEllerNeiType | null>
    egenmeldingsperioder?: SporsmalSvar<Egenmeldingsperiode[]>
    harForsikring?: SporsmalSvar<keyof typeof JaEllerNeiType | null>
}

interface FormProps {
    sykmelding: SykmeldingFragment
}

function Form({ sykmelding }: FormProps): JSX.Element {
    const skjemanavn = !sykmelding.papirsykmelding ? 'åpen sykmelding' : 'åpen papirsykmelding'

    const logEvent = useAmplitude()
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    const sykmeldingId = useGetSykmeldingIdParam()

    const { data, error, loading } = useExtraFormData(sykmeldingId)
    const [{ loading: fetchingSend, error: errorSend }, send] = useSubmitSykmelding(
        sykmeldingId,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

    const formMethods = useForm<FormShape>({ shouldFocusError: false })
    const {
        handleSubmit,
        watch,
        formState: { errors },
    } = formMethods

    const erArbeidstaker = watch('arbeidssituasjon')?.svar === 'ARBEIDSTAKER'
    const erArbeidstakerMedStrengtFortroligAdressse =
        erArbeidstaker && data?.brukerinformasjon?.strengtFortroligAdresse === true
    const harValgtArbeidsgiver = !!watch('arbeidsgiverOrgnummer')?.svar
    const watchErOpplysningeneRiktige = watch('erOpplysningeneRiktige')
    const watchUriktigeOpplysninger = watch('uriktigeOpplysninger')

    const { maAvbryte } = useContext(AvbrytContext)

    if (loading) {
        return (
            <Spacing amount="large">
                <Spinner headline="Henter arbeidsforhold" />
            </Spacing>
        )
    }

    if (error || data?.brukerinformasjon == null || data?.sykmeldingUtenforVentetid == null) {
        return (
            <Spacing>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi klarte dessverre ikke å hente opp informasjonen som trengs for at du kan bruke sykmeldingen.
                    Vennligst prøv igjen senere.
                </Alert>
            </Spacing>
        )
    }

    function onSubmit(data: FormShape): void {
        if (data?.arbeidssituasjon?.svar === 'PERMITTERT') {
            data.arbeidssituasjon.svar = 'ARBEIDSLEDIG'
        }
        send(data)
    }

    return (
        <FormProvider {...formMethods}>
            <form id="apen-sykmelding-form" onSubmit={handleSubmit(onSubmit)}>
                <Spacing>
                    <ErOpplysningeneRiktige />

                    {shouldArbeidssituasjonShow(watchErOpplysningeneRiktige, watchUriktigeOpplysninger, maAvbryte) && (
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
                            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
                        </div>
                    )}

                    {errorSend && (
                        <Spacing amount="small">
                            <Alert variant="error" role="alert" aria-live="polite">
                                {errorSend.message}
                            </Alert>
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
                                disabled={fetchingSend}
                                variant="primary"
                                type="submit"
                                loading={fetchingSend}
                            >
                                {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding
                            </Button>
                        </div>
                    </Spacing>
                )}
            </form>
        </FormProvider>
    )
}

function shouldArbeidssituasjonShow(
    erOpplysningeneRiktige: SporsmalSvar<keyof typeof JaEllerNeiType | null> | undefined,
    uriktigeOpplysninger: SporsmalSvar<(keyof typeof UriktigeOpplysningerType)[]> | undefined,
    maAvbryte: boolean,
): boolean {
    switch (erOpplysningeneRiktige?.svar) {
        case 'JA':
            return true
        case 'NEI':
            if (uriktigeOpplysninger?.svar && uriktigeOpplysninger?.svar?.length > 0 && !maAvbryte) {
                return true
            }
        default:
            return false
    }
}

export default Form
