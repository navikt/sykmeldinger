import { MutationResult, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'
import { useRef } from 'react'
import * as R from 'remeda'

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    EndreEgenmeldingsdagerDocument,
    EndreEgenmeldingsdagerMutation,
    MinimalSykmeldingerDocument,
    SendSykmeldingDocument,
    SendSykmeldingMutation,
    SykmeldingCategory,
    SykmeldingChangeStatus,
} from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { EgenmeldingsdagerSubForm } from '../components/FormComponents/Egenmelding/EgenmeldingerField'
import { typedRefetchQuery } from '../fetching/apollo'
import { useFlag } from '../toggles/context'
import { mapEgenmeldingsdager, mapToSendSykmeldingValues } from '../utils/toSendSykmeldingUtils'

export function useChangeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<ChangeSykmeldingStatusMutation>, () => void] {
    const dedupeRef = useRef(false)
    const newFetching = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')
    const [submit, result] = useMutation(ChangeSykmeldingStatusDocument, {
        refetchQueries: newFetching.enabled ? refetchListQueries : [],
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
    const newFetching = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')
    const [submit, result] = useMutation(SendSykmeldingDocument, {
        refetchQueries: newFetching.enabled ? refetchListQueries : [],
        onCompleted: async () => {
            await router.push(`/${sykmeldingId}/kvittering`)
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
    const newFetching = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')
    const [endreEgenmeldingsdager, result] = useMutation(EndreEgenmeldingsdagerDocument, {
        refetchQueries: newFetching.enabled ? refetchListQueries : [],

        onCompleted: () => {
            window.scrollTo(0, 0)
            router.push(`/${sykmeldingId}/kvittering?egenmelding=true`)
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

            const egenmeldingsdager = mapEgenmeldingsdager(values.egenmeldingsdager)
            await endreEgenmeldingsdager({
                variables: { sykmeldingId, egenmeldingsdager: [...egenmeldingsdager].sort() },
            })

            onCompleted(values)
        },
    ]
}

const refetchListQueries = R.pipe(
    SykmeldingCategory,
    R.values,
    R.map((category) =>
        typedRefetchQuery({
            query: MinimalSykmeldingerDocument,
            variables: { category: category },
        }),
    ),
)
