import * as R from 'remeda'
import { add, isAfter, isBefore, sub } from 'date-fns'

import { SykmeldingFragment } from 'queries'

import { toDate } from '../../../utils/dateUtils'
import { getSykmeldingStartDate } from '../../../utils/sykmeldingUtils'

import { EgenmeldingsdagerFormValue } from './EgenmeldingerField'

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

export function cumulativeDays(
    _allPeriods: EgenmeldingsdagerFormValue[],
    index: number,
): {
    cumulativeBefore: number
    cumulativeIncluding: number
} {
    /* There's a weird quirk with the form state when the field has just
       mounted, if the field is missing we'll pad it in until the form state updates

       Also if the field hits the limit, it'll never mount the field, so it will always be padded
    */
    const allPeriods: EgenmeldingsdagerFormValue[] =
        _allPeriods.length - 1 < index
            ? [..._allPeriods, { harPerioder: null, hasClickedVidere: null, datoer: null }]
            : _allPeriods

    if (allPeriods.length === 0) return { cumulativeBefore: 0, cumulativeIncluding: 0 }
    if (allPeriods.length === 1) return { cumulativeBefore: 0, cumulativeIncluding: allPeriods[0].datoer?.length ?? 0 }

    const [last, ...before] = R.reverse(R.take(allPeriods, index + 1))

    const cummulativeDaysBehindThisField = R.pipe(
        before,
        R.map((x) => (x.datoer ? x.datoer.length : 0)),
        R.reduce((acc, x) => acc + x, 0),
    )

    return {
        cumulativeBefore: cummulativeDaysBehindThisField,
        cumulativeIncluding: cummulativeDaysBehindThisField + (last.datoer ? last.datoer.length : 0),
    }
}
