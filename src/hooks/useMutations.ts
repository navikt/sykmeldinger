import { MutationResult, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'

import {
    ChangeSykmeldingStatusDocument,
    ChangeSykmeldingStatusMutation,
    SendSykmeldingDocument,
    SendSykmeldingMutation,
    SendSykmeldingValues,
    SubmitSykmeldingDocument,
    SubmitSykmeldingMutation,
    SykmeldingChangeStatus,
} from '../fetching/graphql.generated'
import { FormShape } from '../components/SykmeldingViews/OK/APEN/Form/Form'
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

export function useSubmitSykmelding(
    sykmeldingId: string,
    onCompleted: () => void,
    onError: () => void,
): [MutationResult<SubmitSykmeldingMutation>, (values: FormShape) => void] {
    const router = useRouter()
    const [submit, result] = useMutation(SubmitSykmeldingDocument, {
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
            submit({ variables: { sykmeldingId, values: mapFormValuesToApiValues(values) } })
        },
    ]
}

function mapFormValuesToApiValues(values: FormShape): unknown {
    const egenmeldingsperioder =
        values.egenmeldingsperioder?.svar != null
            ? {
                  ...values.egenmeldingsperioder,
                  svar: values.egenmeldingsperioder?.svar?.map((svar) => ({
                      fom: svar.range.fom ? toDateString(svar.range.fom) : null,
                      tom: svar.range.tom ? toDateString(svar.range.tom) : null,
                  })),
              }
            : undefined

    // TODO: Temporary logging to track usage of new date-picker :)
    if (egenmeldingsperioder) {
        logger.info(
            `New datepicker: mapping values for ${
                egenmeldingsperioder.svar.length
            } egenmeldingsperioder. ${egenmeldingsperioder.svar
                .map((it) => `fom-length: ${it.fom?.length}, tom-length: ${it.tom?.length}`)
                .join(', ')}`,
        )
    }

    return {
        ...values,
        egenmeldingsperioder: egenmeldingsperioder,
    }
}

/**
 * New alternative API for submitting sykmeldinger. This will eventually replace
 * submitSykmelding. Until the åpen sykmelding form is migrated to the new API,
 * we need to keep the old API around.
 */
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
