import { MutationResult, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'
import { useRef } from 'react'

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    SendSykmeldingDocument,
    SendSykmeldingMutation,
    SykmeldingChangeStatus,
} from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { mapToSendSykmeldingValues } from '../utils/toSendSykmeldingUtils'

export function useChangeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<ChangeSykmeldingStatusMutation>, () => void] {
    const dedupeRef = useRef(false)
    const [submit, result] = useMutation(ChangeSykmeldingStatusDocument, {
        variables: {
            sykmeldingId,
            status,
        },
        onCompleted: () => {
            dedupeRef.current = false
            onCompleted()
            window.scrollTo(0, 0)
        },
        onError: () => {
            dedupeRef.current = false
            onError()
        },
    })

    return [
        result,
        () => {
            if (dedupeRef.current) {
                logger.warn(`Duplicate submit prevented for ${sykmeldingId}`)
                return
            }

            logger.info(`Client: Changing status for sykmelding ${sykmeldingId} to ${status}`)
            dedupeRef.current = true
            submit()
        },
    ]
}

export function useSendSykmelding(
    sykmeldingId: string,
    onCompleted: (values: FormValues) => void,
    onError: () => void,
): [MutationResult<SendSykmeldingMutation>, (values: FormValues) => void] {
    const router = useRouter()
    const [submit, result] = useMutation(SendSykmeldingDocument, {
        onCompleted: async () => {
            await router.push(`/${sykmeldingId}/kvittering`, undefined, { scroll: true })
        },
        onError: () => {
            onError()
        },
    })

    return [
        result,
        async (values) => {
            logger.info(`Client: Submitting sykmelding ${sykmeldingId}`)

            await submit({ variables: { sykmeldingId, values: mapToSendSykmeldingValues(values) } })

            onCompleted(values)
        },
    ]
}
