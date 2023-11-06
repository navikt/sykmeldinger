import { add, isAfter, isBefore, sub } from 'date-fns'

import { SykmeldingFragment } from 'queries'

import { toDate } from '../../../utils/dateUtils'
import { getSykmeldingStartDate } from '../../../utils/sykmeldingUtils'

export function currentPeriodDatePicker(
    previous: {
        earliestPossibleDate: Date
        earliestSelectedDate: Date | null
    },
    previousSykmeldingTom: Date | null,
): [earliest: Date, latest: Date] {
    const latest = sub(previous.earliestPossibleDate, { days: 1 })
    const earliest = previous.earliestSelectedDate
        ? sub(previous.earliestSelectedDate, { days: 16 })
        : sub(previous.earliestPossibleDate, { days: 16 })

    // Earliest should be limited by previous sykmelding
    if (previousSykmeldingTom && isBefore(earliest, previousSykmeldingTom)) {
        return [add(previousSykmeldingTom, { days: 1 }), latest]
    } else {
        return [earliest, latest]
    }
}

export function hasHitPreviousSykmeldingTom(
    sykmelding: SykmeldingFragment,
    previousSykmeldingTom: Date | null,
): boolean {
    const [earliestPossibleDate, latestPossibleDate] = currentPeriodDatePicker(
        {
            earliestPossibleDate: toDate(getSykmeldingStartDate(sykmelding.sykmeldingsperioder)),
            earliestSelectedDate: null,
        },
        previousSykmeldingTom,
    )

    return isAfter(earliestPossibleDate, latestPossibleDate)
}
