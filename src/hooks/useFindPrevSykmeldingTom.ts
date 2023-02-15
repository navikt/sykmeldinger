import { closestTo, isBefore } from 'date-fns'

import { SykmeldingFragment } from '../fetching/graphql.generated'
import { toDate } from '../utils/dateUtils'
import { getSykmeldingEndDate, isSendtSykmelding } from '../utils/sykmeldingUtils'

import useSykmeldinger from './useSykmeldinger'

export function useFindPrevSykmeldingTom(sykmelding: SykmeldingFragment): {
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

    const sendtSykmeldinger = data.sykmeldinger.filter((it) => isSendtSykmelding(it))

    const latestTomForGivenSykmelding: Date = toDate(getSykmeldingEndDate(sykmelding))
    const latestTomList: Date[] = sendtSykmeldinger
        .flatMap((it) => toDate(getSykmeldingEndDate(it)))
        .filter((date) => isBefore(date, latestTomForGivenSykmelding))

    const nearestTom: Date | undefined = closestTo(latestTomForGivenSykmelding, latestTomList)

    return {
        previousSykmeldingTom: nearestTom ?? null,
        isLoading: false,
        error: undefined,
    }
}
