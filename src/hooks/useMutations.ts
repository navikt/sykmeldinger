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
    SendSykmeldingValues,
    SykmeldingChangeStatus,
} from '../fetching/graphql.generated'
import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { toDateString } from '../utils/dateUtils'
import {
    EgenmeldingsdagerFormValue,
    EgenmeldingsdagerSubForm,
} from '../components/FormComponents/Egenmelding/EgenmeldingerField'

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
        onCompleted: () => {
            window.scrollTo(0, 0)
            router.push(`/${sykmeldingId}/kvittering`)
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
            window.scrollTo(0, 0)
            router.push(`/${sykmeldingId}/kvittering?egenmelding=true`)
        },
        onError,
    })

    return [
        result,
        async (values) => {
            logger.info(`Client: Submitting 'endre egenmeldingsdager' for ${sykmeldingId}`)

            const egenmeldingsdager = mapEgenmeldingsdager(values.egenmeldingsdager)
            if (!egenmeldingsdager || egenmeldingsdager.length === 0) {
                throw new Error(
                    'Trying to endre egenmeldingsdager, but no egenmeldingsdager was provided. Bug in the form?',
                )
            }

            await endreEgenmeldingsdager({
                variables: { sykmeldingId, egenmeldingsdager },
            })

            onCompleted(values)
        },
    ]
}

function mapToSendSykmeldingValues(values: FormValues): SendSykmeldingValues {
    return {
        ...values,
        egenmeldingsperioder: values.egenmeldingsperioder?.map((periode) => ({
            fom: periode.fom ? toDateString(periode.fom) : null,
            tom: periode.tom ? toDateString(periode.tom) : null,
        })),
        harEgenmeldingsdager: getEgenmeldingsdager(values.egenmeldingsdager),
        egenmeldingsdager: mapEgenmeldingsdager(values.egenmeldingsdager),
    }
}

function getEgenmeldingsdager(value: FormValues['egenmeldingsdager']): SendSykmeldingValues['harEgenmeldingsdager'] {
    if (value == null || value.length === 0) {
        return undefined
    }

    return value[0].harPerioder
}

function mapEgenmeldingsdager(value: EgenmeldingsdagerFormValue[] | null): readonly string[] | undefined {
    if (value == null || value.length === 0) {
        return undefined
    }

    const dates = value.flatMap((dager) => dager.datoer).filter((it): it is Date => it != null)

    if (dates.length === 0) {
        return undefined
    }

    return dates.map(toDateString)
}
