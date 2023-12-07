import { ReactElement, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert } from '@navikt/ds-react'
import dynamic from 'next/dynamic'
import * as R from 'remeda'

import { YesOrNo, UriktigeOpplysningerType, ArbeidssituasjonType, SykmeldingFragment, Blad, LottOgHyre } from 'queries'

import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam'
import useExtraFormData from '../../hooks/useExtraFormData'
import { useSendSykmelding } from '../../hooks/useMutations'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../amplitude/amplitude'
import Spinner from '../Spinner/Spinner'
import { EgenmeldingsdagerSubForm } from '../FormComponents/Egenmelding/EgenmeldingerField'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'
import { browserEnv } from '../../utils/env'

import OpplysningerRiktigeSection from './FormSections/OpplysningerRiktige/OpplysningerRiktigeSection'
import ActionSection from './FormSections/ActionSection'
import ArbeidssituasjonSection from './FormSections/Arbeidssituasjon/ArbeidssituasjonSection'
import ErrorSection from './FormSections/ErrorSection'

const FormDevTools = dynamic(() => import('../FormComponents/DevTools/FormDevTools'), {
    ssr: false,
})
const AutoFillerDevTools = dynamic(() => import('../FormComponents/DevTools/AutoFillerDevTools'), {
    ssr: false,
})

export interface FormValues extends EgenmeldingsdagerSubForm {
    erOpplysningeneRiktige: YesOrNo | null
    uriktigeOpplysninger: UriktigeOpplysningerType[] | null
    arbeidssituasjon: ArbeidssituasjonType | null
    arbeidsgiverOrgnummer: string | null
    riktigNarmesteLeder: YesOrNo | null
    harBruktEgenmelding: YesOrNo | null
    egenmeldingsperioder: { fom: Date | null; tom: Date | null }[] | null
    harForsikring: YesOrNo | null
    fisker: {
        blad: Blad | null
        lottOgHyre: LottOgHyre | null
    }
}

interface Props {
    sykmelding: SykmeldingFragment
}

function SendSykmeldingForm({ sykmelding }: Props): ReactElement {
    const skjemanavn = !sykmelding.papirsykmelding ? 'åpen sykmelding' : 'åpen papirsykmelding'
    const sykmeldingId = useGetSykmeldingIdParam()

    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    const errorSectionRef = useRef<HTMLDivElement>(null)
    const form = useForm<FormValues>({
        shouldFocusError: false,
        defaultValues: {
            erOpplysningeneRiktige: null,
            uriktigeOpplysninger: null,
            arbeidssituasjon: null,
            arbeidsgiverOrgnummer: null,
            riktigNarmesteLeder: null,
            harBruktEgenmelding: null,
            // useFieldArray doesn't allow default values when mounted
            egenmeldingsperioder: [{ fom: null, tom: null }],
            harForsikring: null,
            egenmeldingsdager: null,
            fisker: {
                blad: null,
                lottOgHyre: null,
            },
        },
    })
    const extraFormData = useExtraFormData(sykmeldingId)
    const [sendSykmeldingResult, sendSykmelding] = useSendSykmelding(
        sykmeldingId,
        (values) =>
            logAmplitudeEvent(
                { eventName: 'skjema fullført', data: { skjemanavn } },
                { 'antall egenmeldingsdager': values.egenmeldingsdager?.length ?? null },
            ),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

    useWarnUnsavedPopup(form.formState.isDirty && !form.formState.isSubmitSuccessful)

    if (extraFormData.loading) {
        return <Spinner headline="Henter arbeidsforhold" />
    }

    if (extraFormData.error || !extraFormData.data) {
        return (
            <Alert variant="error" role="alert" aria-live="polite">
                Vi klarte dessverre ikke å hente opp informasjonen som trengs for at du kan bruke sykmeldingen.
                Vennligst prøv igjen senere.
            </Alert>
        )
    }

    return (
        <FormProvider {...form}>
            {(browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev' ||
                browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'local') && (
                <AutoFillerDevTools sykmeldingId={sykmeldingId} />
            )}
            <form
                onSubmit={form.handleSubmit(sendSykmelding, (errors) => {
                    logAmplitudeEvent(
                        {
                            eventName: 'skjema validering feilet',
                            data: { skjemanavn },
                        },
                        { ...R.mapValues(errors, () => true) },
                    )
                    requestAnimationFrame(() => {
                        errorSectionRef.current?.focus()
                    })
                })}
            >
                <OpplysningerRiktigeSection />
                <ArbeidssituasjonSection
                    sykmelding={sykmelding}
                    sykmeldingUtenforVentetid={extraFormData.data.sykmeldingUtenforVentetid}
                    brukerinformasjon={extraFormData.data.brukerinformasjon}
                />
                <ErrorSection ref={errorSectionRef} />
                <ActionSection sykmeldingId={sykmeldingId} sendResult={sendSykmeldingResult} />
                {process.env.NODE_ENV !== 'production' && <FormDevTools />}
            </form>
        </FormProvider>
    )
}

export default SendSykmeldingForm
