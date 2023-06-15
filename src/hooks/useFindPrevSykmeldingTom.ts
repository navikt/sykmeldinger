import { closestTo, isBefore, isSameDay } from 'date-fns'
import { intersection } from 'remeda'

import { Periodetype, SykmeldingFragment } from '../fetching/graphql.generated'
import { toDate } from '../utils/dateUtils'
import { getSykmeldingEndDate, isSendtSykmelding } from '../utils/sykmeldingUtils'

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

    const latestTomForGivenSykmelding: Date = toDate(getSykmeldingEndDate(sykmelding))
    const latestTomList: Date[] = sendtSykmeldinger
        .flatMap((it) => toDate(getSykmeldingEndDate(it)))
        .filter((date) => isBefore(date, latestTomForGivenSykmelding) || isSameDay(date, latestTomForGivenSykmelding))

    const nearestTom: Date | undefined = closestTo(latestTomForGivenSykmelding, latestTomList)

    return {
        previousSykmeldingTom: nearestTom ?? null,
        isLoading: false,
        error: undefined,
    }
}

function removeIgnored(ignored: Periodetype[] | undefined) {
    return (sykmelding: SykmeldingFragment): boolean =>
        ignored == null
            ? true
            : intersection(
                  ignored,
                  sykmelding.sykmeldingsperioder.map((it) => it.type),
              ).length === 0
}
