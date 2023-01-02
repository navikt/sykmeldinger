import { MutationResult, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    SendSykmeldingDocument,
    SendSykmeldingMutation,
    SendSykmeldingValues,
    SykmeldingChangeStatus,
} from '../fetching/graphql.generated'
import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'
import { toDateString } from '../utils/dateUtils'

export function useChangeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<ChangeSykmeldingStatusMutation>, () => void] {
    const [submit, result] = useMutation(ChangeSykmeldingStatusDocument, {
        variables: {
            sykmeldingId,
            status,
        },
        onCompleted: () => {
            onCompleted()
            window.scrollTo(0, 0)
        },
        onError: () => {
            onError()
        },
    })

    return [
        result,
        () => {
            logger.info(`Client: Changing status for sykmelding ${sykmeldingId} to ${status}`)
            submit()
        },
    ]
}

export function useSendSykmelding(
    sykmeldingId: string,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<SendSykmeldingMutation>, (values: FormValues) => void] {
    const router = useRouter()
    const [submit, result] = useMutation(SendSykmeldingDocument, {
        onCompleted: () => {
            onCompleted()
            window.scrollTo(0, 0)
            router.push(`/${sykmeldingId}/kvittering`)
        },
        onError: () => {
            onError()
        },
    })

    return [
        result,
        (values) => {
            logger.info(`Client: Submitting sykmelding ${sykmeldingId}`)

            submit({ variables: { sykmeldingId, values: mapToSendSykmeldingValues(values) } })
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
    }
}
