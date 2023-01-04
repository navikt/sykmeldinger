import React, { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert } from '@navikt/ds-react'

import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam'
import {
    YesOrNo,
    UriktigeOpplysningerType,
    ArbeidssituasjonType,
    SykmeldingFragment,
} from '../../fetching/graphql.generated'
import useExtraFormData from '../../hooks/useExtraFormData'
import { useSendSykmelding } from '../../hooks/useMutations'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../amplitude/amplitude'
import Spinner from '../Spinner/Spinner'

import OpplysningerRiktigeSection from './FormSections/OpplysningerRiktige/OpplysningerRiktigeSection'
import ActionSection from './FormSections/ActionSection'
import ArbeidssituasjonSection from './FormSections/Arbeidssituasjon/ArbeidssituasjonSection'
import ErrorSection from './FormSections/ErrorSection'

export interface FormValues {
    erOpplysningeneRiktige: YesOrNo | null
    uriktigeOpplysninger: UriktigeOpplysningerType[] | null
    arbeidssituasjon: ArbeidssituasjonType | null
    arbeidsgiverOrgnummer: string | null
    riktigNarmesteLeder: YesOrNo | null
    harBruktEgenmelding: YesOrNo | null
    egenmeldingsperioder: { fom: Date | null; tom: Date | null }[] | null
    harForsikring: YesOrNo | null
}

interface Props {
    sykmelding: SykmeldingFragment
}

function SendSykmeldingForm({ sykmelding }: Props): JSX.Element {
    const skjemanavn = !sykmelding.papirsykmelding ? 'åpen sykmelding' : 'åpen papirsykmelding'
    const sykmeldingId = useGetSykmeldingIdParam()

    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    const errorSectionRef = useRef<HTMLDivElement>(null)
    const form = useForm<FormValues>({ shouldFocusError: false })
    const extraFormData = useExtraFormData(sykmeldingId)
    const [sendSykmeldingResult, sendSykmelding] = useSendSykmelding(
        sykmeldingId,
        () => logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

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
            <form
                onSubmit={form.handleSubmit(sendSykmelding, () => {
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
            </form>
        </FormProvider>
    )
}

export default SendSykmeldingForm
