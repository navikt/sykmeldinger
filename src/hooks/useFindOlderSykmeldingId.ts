import { isBefore, parseISO } from 'date-fns'

import { SykmeldingFragment } from 'queries'

import { getSykmeldingStartDate, isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils'

import useSykmeldinger from './useSykmeldinger'

/**
 * Used by reduce to find the earliest sykmelding
 */
export function toEarliestSykmelding(acc: SykmeldingFragment, value: SykmeldingFragment): SykmeldingFragment {
    const valuePerioder = value.sykmeldingsperioder
    const accPerioder = acc.sykmeldingsperioder

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

    const startDate: string = getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
    const unsentExceptOverlappingDates = unsentSykmeldinger.filter(
        (it) => getSykmeldingStartDate(it.sykmeldingsperioder) !== startDate,
    )

    const earliestSykmelding = unsentExceptOverlappingDates.reduce(toEarliestSykmelding, sykmelding)
    const earliestId = earliestSykmelding.id

    return {
        // When the earliest sykmelding is the provided sykmelding, it's the very first
        earliestSykmeldingId: earliestId === sykmelding.id ? null : earliestId,
        olderSykmeldingCount: unsentExceptOverlappingDates.length,
        isLoading: false,
        error: undefined,
    }
}

export default useFindOlderSykmeldingId
