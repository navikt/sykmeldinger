import { closestTo, isBefore, isSameDay } from 'date-fns'
import { intersection } from 'remeda'
import { useQuery } from '@apollo/client'

import {
    MinimalSykmeldingerDocument,
    MinimalSykmeldingFragment,
    Periodetype,
    SykmeldingCategory,
    SykmeldingFragment,
} from '../fetching/graphql.generated'
import { toDate } from '../utils/dateUtils'
import { getSykmeldingEndDate, isSendtSykmelding } from '../utils/sykmeldingUtils'
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
        variables: { category: SykmeldingCategory.OLDER },
    })

    if (older.loading || processing.loading || older.error == null || processing.error) {
        return {
            previousSykmeldingTom: null,
            isLoading: older.loading || processing.loading,
            error: older.error ?? processing.error,
        }
    }

    const sykmeldinger: MinimalSykmeldingFragment[] = [
        ...(older.data?.minimalSykmeldinger ?? []),
        ...(processing.data?.minimalSykmeldinger ?? []),
    ]
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
