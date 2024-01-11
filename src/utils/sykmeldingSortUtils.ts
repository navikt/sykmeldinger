import { compareAsc, isAfter } from 'date-fns'
import { sortBy } from 'remeda'

import { SykmeldingFragment } from 'queries'

import { toDate } from './dateUtils'

/**
 * Used by reduce to get the latest tom date
 */
export const toLatestTom = <Tommable extends { tom: string }>(
    previousValue: Tommable,
    currentValue: Tommable,
): Tommable => (isAfter(toDate(previousValue.tom), toDate(currentValue.tom)) ? previousValue : currentValue)

export function sykmeldingByDateAsc(a: SykmeldingFragment, b: SykmeldingFragment): number {
    const latestA = a.sykmeldingsperioder.reduce(toLatestTom)
    const latestB = b.sykmeldingsperioder.reduce(toLatestTom)

    return compareAsc(toDate(latestA.tom), toDate(latestB.tom))
}

/**
 * Get a list of sykmelidnger sorted by arbeidsgiver
 * @param {Sykmelding[]} sykmeldinger A list of sykmeldinger
 * @return {Sykmeldinger[]} A new list of sorted sykmeldinger
 */
export function sortSykmeldingerByArbeidsgiver(sykmeldinger: SykmeldingFragment[]): SykmeldingFragment[] {
    if (sykmeldinger.length === 0) return sykmeldinger

    return sortBy(sykmeldinger, [(sykmelding) => sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? '', 'asc'])
}
