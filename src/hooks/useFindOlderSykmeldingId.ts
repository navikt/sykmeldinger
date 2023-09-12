import { isBefore, parseISO } from 'date-fns'
import { useQuery } from '@apollo/client'

import {
    MinimalSykmeldingerDocument,
    MinimalSykmeldingFragment,
    SykmeldingCategory,
    SykmeldingFragment,
} from '../fetching/graphql.generated'
import { getSykmeldingStartDate, isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils'
import { useFlag } from '../toggles/context'

import useSykmeldinger from './useSykmeldinger'

/**
 * Used by reduce to find the earliest sykmelding
 */
export function toEarliestSykmelding<Sykmelding extends SykmeldingFragment | MinimalSykmeldingFragment>(
    acc: Sykmelding,
    value: Sykmelding,
): Sykmelding {
    const valuePerioder =
        value.__typename === 'Sykmelding' ? value.sykmeldingsperioder : value.sykmelding.sykmeldingsperioder
    const accPerioder = acc.__typename === 'Sykmelding' ? acc.sykmeldingsperioder : acc.sykmelding.sykmeldingsperioder

    return isBefore(parseISO(getSykmeldingStartDate(valuePerioder)), parseISO(getSykmeldingStartDate(accPerioder)))
        ? value
        : acc
}

export function useUnsentSykmeldinger(): {
    unsentSykmeldinger: SykmeldingFragment[] | null
    isLoading: boolean
    error: Error | undefined
} {
    const { data, error, loading } = useSykmeldinger()

    if (loading || error || data?.sykmeldinger == null) {
        return {
            unsentSykmeldinger: null,
            isLoading: loading,
            error,
        }
    }

    const relevantSykmeldinger = data?.sykmeldinger.filter((it) => isActiveSykmelding(it) && !isUnderbehandling(it))

    return {
        unsentSykmeldinger: relevantSykmeldinger,
        isLoading: false,
        error: undefined,
    }
}

export function useUnsentSykmeldingerNew(): {
    unsentSykmeldinger: MinimalSykmeldingFragment[] | null
    isLoading: boolean
    error: Error | undefined
} {
    const { data, error, loading } = useQuery(MinimalSykmeldingerDocument, {
        variables: { category: SykmeldingCategory.UNSENT },
    })

    if (loading || error || data?.minimalSykmeldinger == null) {
        return {
            unsentSykmeldinger: null,
            isLoading: loading,
            error,
        }
    }

    return {
        unsentSykmeldinger: [...data.minimalSykmeldinger],
        isLoading: false,
        error: undefined,
    }
}

function useFindOlderSykmeldingId(sykmelding: SykmeldingFragment | undefined): {
    earliestSykmeldingId: string | null
    olderSykmeldingCount: number
    isLoading: boolean
    error: Error | undefined
} {
    const newDataFetching = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')
    const { unsentSykmeldinger, error, isLoading } = (
        newDataFetching ? useUnsentSykmeldingerNew : useUnsentSykmeldinger
    )()

    if (sykmelding == null || isLoading || error || unsentSykmeldinger == null) {
        return {
            earliestSykmeldingId: null,
            olderSykmeldingCount: 0,
            isLoading,
            error,
        }
    }

    const startDate: string = getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
    const unsentExceptOverlappingDates = unsentSykmeldinger.filter(
        (it) =>
            getSykmeldingStartDate(
                it.__typename === 'Sykmelding' ? it.sykmeldingsperioder : it.sykmelding.sykmeldingsperioder,
            ) !== startDate,
    )

    const earliestSykmelding = unsentExceptOverlappingDates.reduce(toEarliestSykmelding, sykmelding)
    const earliestId =
        earliestSykmelding.__typename === 'Sykmelding' ? earliestSykmelding.id : earliestSykmelding.sykmelding_id

    return {
        // When the earliest sykmelding is the provided sykmelding, it's the very first
        earliestSykmeldingId: earliestId === sykmelding.id ? null : earliestId,
        olderSykmeldingCount: unsentExceptOverlappingDates.length,
        isLoading: false,
        error: undefined,
    }
}

export default useFindOlderSykmeldingId
