import { MutationResult, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'
import { useRef } from 'react'

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    EndreEgenmeldingsdagerDocument,
    EndreEgenmeldingsdagerMutation,
    SendSykmeldingDocument,
    SendSykmeldingMutation,
    SykmeldingChangeStatus,
} from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { EgenmeldingsdagerSubForm } from '../components/FormComponents/Egenmelding/EgenmeldingerField'
import { getEgenmeldingsdagerDateList, mapToSendSykmeldingValues } from '../utils/toSendSykmeldingUtils'

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

export function useEndreEgenmeldingsdager(
    sykmeldingId: string,
    onCompleted: (values: EgenmeldingsdagerSubForm) => void,
    onError: () => void,
): [MutationResult<EndreEgenmeldingsdagerMutation>, (values: EgenmeldingsdagerSubForm) => void] {
    const router = useRouter()
    const [endreEgenmeldingsdager, result] = useMutation(EndreEgenmeldingsdagerDocument, {
        onCompleted: () => {
            router.push(`/${sykmeldingId}/kvittering?egenmelding=true`, undefined, { scroll: true })
        },
        onError,
    })

    return [
        result,
        async (values) => {
            logger.info(`Client: Submitting 'endre egenmeldingsdager' for ${sykmeldingId}`)

            if (values.egenmeldingsdager == null || values.egenmeldingsdager.length === 0) {
                throw new Error(
                    'Trying to endre egenmeldingsdager, but no egenmeldingsdager was provided. Bug in the form?',
                )
            }

            const egenmeldingsdager = getEgenmeldingsdagerDateList(values.egenmeldingsdager)
            await endreEgenmeldingsdager({
                variables: { sykmeldingId, egenmeldingsdager: [...egenmeldingsdager].sort() },
            })

            onCompleted(values)
        },
    ]
}
