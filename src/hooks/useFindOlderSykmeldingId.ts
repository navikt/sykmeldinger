import { isBefore, parseISO } from 'date-fns'

import { Sykmelding, SykmeldingFragment } from '../fetching/graphql.generated'
import { getSykmeldingStartDate, isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils'

import useSykmeldinger from './useSykmeldinger'

/**
 * Used by reduce to find the earliest sykmelding
 */
export function toEarliestSykmelding(acc: SykmeldingFragment, value: SykmeldingFragment): SykmeldingFragment {
    return isBefore(parseISO(getSykmeldingStartDate(value)), parseISO(getSykmeldingStartDate(acc))) ? value : acc
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

function useFindOlderSykmeldingId(sykmelding: SykmeldingFragment | undefined): {
    earliestSykmeldingId: string | null
    olderSykmeldingCount: number
    isLoading: boolean
    error: Error | undefined
} {
    const { unsentSykmeldinger, error, isLoading } = useUnsentSykmeldinger()

    if (sykmelding == null || isLoading || error || unsentSykmeldinger == null) {
        return {
            earliestSykmeldingId: null,
            olderSykmeldingCount: 0,
            isLoading,
            error,
        }
    }

    const startDate: string = getSykmeldingStartDate(sykmelding)
    const unsentExceptOverlappingDates = unsentSykmeldinger.filter((it) => getSykmeldingStartDate(it) !== startDate)
    const earliestSykmelding: Sykmelding = unsentExceptOverlappingDates.reduce(toEarliestSykmelding, sykmelding)

    return {
        // When the earliest sykmelding is the provided sykmelding, it's the very first
        earliestSykmeldingId: earliestSykmelding.id === sykmelding.id ? null : earliestSykmelding.id,
        olderSykmeldingCount: unsentExceptOverlappingDates.length,
        isLoading: false,
        error: undefined,
    }
}

export default useFindOlderSykmeldingId
