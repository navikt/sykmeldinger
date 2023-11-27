import { closestTo, isBefore, isSameDay, isWithinInterval } from 'date-fns'
import { intersection } from 'remeda'
import { useQuery } from '@apollo/client'

import {
    MinimalSykmeldingerDocument,
    MinimalSykmeldingFragment,
    Periodetype,
    SykmeldingCategory,
    SykmeldingFragment,
} from 'queries'

import { toDate } from '../utils/dateUtils'
import { getSykmeldingEndDate, getSykmeldingStartDate, isSendtSykmelding } from '../utils/sykmeldingUtils'
import { useFlag } from '../toggles/context'

import useSykmeldinger from './useSykmeldinger'

export function useFindPrevSykmeldingTom(
    sykmelding: SykmeldingFragment,
    valgtArbeidsgiverOrgnummer: string | null | undefined,
    ignore?: Periodetype[],
): {
    previousSykmeldingTom: Date | null
    isLoading: boolean
    error: Error | undefined
} {
    const newFetching = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')
    return (newFetching.enabled ? useFindPrevMinimalSykmeldingTom : useFindPrevSykmeldingTomOld)(
        sykmelding,
        valgtArbeidsgiverOrgnummer,
        ignore,
    )
}

function isValidRange(sykmelding: SykmeldingFragment): boolean {
    const start = getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
    const end = getSykmeldingEndDate(sykmelding.sykmeldingsperioder)

    return isBefore(toDate(start), toDate(end))
}

function removeInsideSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]) {
    return (sykmelding: SykmeldingFragment): boolean => {
        const others = sykmeldinger
            .filter(isSendtSykmelding)
            .filter(isValidRange)
            .filter((it) => it.id !== sykmelding.id)

        return !others.some((other) => {
            const otherInterval = {
                start: toDate(getSykmeldingStartDate(other.sykmeldingsperioder)),
                end: toDate(getSykmeldingEndDate(other.sykmeldingsperioder)),
            }

            return (
                isWithinInterval(toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)), otherInterval) &&
                isWithinInterval(toDate(getSykmeldingEndDate(sykmelding.sykmeldingsperioder)), otherInterval)
            )
        })
    }
}

export function useFindPrevSykmeldingTomOld(
    sykmelding: SykmeldingFragment,
    valgtArbeidsgiverOrgnummer: string | null | undefined,
    ignore?: Periodetype[],
): {
    previousSykmeldingTom: Date | null
    isLoading: boolean
    error: Error | undefined
} {
    const { data, error, loading } = useSykmeldinger()

    if (loading || error || data?.sykmeldinger == null) {
        return {
            previousSykmeldingTom: null,
            isLoading: loading,
            error,
        }
    }

    const sendtSykmeldinger = data.sykmeldinger
        .filter(removeInsideSykmeldinger(data.sykmeldinger))
        .filter(isSendtSykmelding)
        .filter((it) => it.id !== sykmelding.id)
        .filter((it) => it.sykmeldingStatus.arbeidsgiver?.orgnummer == valgtArbeidsgiverOrgnummer)
        .filter(removeIgnored(ignore))

    const latestTomForGivenSykmelding: Date = toDate(getSykmeldingEndDate(sykmelding.sykmeldingsperioder))
    const latestTomList: Date[] = sendtSykmeldinger
        .flatMap((it) => toDate(getSykmeldingEndDate(it.sykmeldingsperioder)))
        .filter((date) => isBefore(date, latestTomForGivenSykmelding) || isSameDay(date, latestTomForGivenSykmelding))

    const nearestTom: Date | undefined = closestTo(latestTomForGivenSykmelding, latestTomList)

    return {
        previousSykmeldingTom: nearestTom ?? null,
        isLoading: false,
        error: undefined,
    }
}

function removeIgnored(ignored: Periodetype[] | undefined) {
    return (sykmelding: SykmeldingFragment | MinimalSykmeldingFragment): boolean =>
        ignored == null
            ? true
            : intersection(
                  ignored,
                  (sykmelding.__typename === 'Sykmelding'
                      ? sykmelding.sykmeldingsperioder
                      : sykmelding.sykmelding.sykmeldingsperioder
                  ).map((it) => it.type),
              ).length === 0
}

export function useFindPrevMinimalSykmeldingTom(
    sykmelding: SykmeldingFragment,
    valgtArbeidsgiverOrgnummer: string | null | undefined,
    ignore?: Periodetype[],
): {
    previousSykmeldingTom: Date | null
    isLoading: boolean
    error: Error | undefined
} {
    const older = useQuery(MinimalSykmeldingerDocument, {
        variables: { category: SykmeldingCategory.OLDER },
    })
    const processing = useQuery(MinimalSykmeldingerDocument, {
        variables: { category: SykmeldingCategory.PROCESSING },
    })

    if (older.loading || processing.loading || older.error == null || processing.error) {
        return {
            previousSykmeldingTom: null,
            isLoading: older.loading || processing.loading,
            error: older.error ?? processing.error,
        }
    }

    const relevantSykmeldinger = [
        ...(older.data?.minimalSykmeldinger ?? []),
        ...(processing.data?.minimalSykmeldinger ?? []),
    ]

    const sykmeldinger: MinimalSykmeldingFragment[] = relevantSykmeldinger
        // TODO: implement logic in "old" impl.
        .filter((it) => it.arbeidsgiver?.orgnummer == valgtArbeidsgiverOrgnummer)
        .filter(removeIgnored(ignore))

    const latestTomForGivenSykmelding: Date = toDate(getSykmeldingEndDate(sykmelding.sykmeldingsperioder))
    const latestTomList: Date[] = sykmeldinger
        .flatMap((it) => toDate(getSykmeldingEndDate(it.sykmelding.sykmeldingsperioder)))
        .filter((date) => isBefore(date, latestTomForGivenSykmelding) || isSameDay(date, latestTomForGivenSykmelding))
    const nearestTom: Date | undefined = closestTo(latestTomForGivenSykmelding, latestTomList)

    return {
        previousSykmeldingTom: nearestTom ?? null,
        isLoading: false,
        error: undefined,
    }
}
