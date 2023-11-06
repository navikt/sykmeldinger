import { compareAsc, isAfter } from 'date-fns'
import { sortBy } from 'remeda'

import { MinimalSykmeldingFragment, SykmeldingFragment } from 'queries'

import { toDate } from './dateUtils'

/**
 * Used by reduce to get the latest tom date
 */
export const toLatestTom = <Tommable extends { tom: string }>(
    previousValue: Tommable,
    currentValue: Tommable,
): Tommable => (isAfter(toDate(previousValue.tom), toDate(currentValue.tom)) ? previousValue : currentValue)

export function sykmeldingByDateAsc(
    a: SykmeldingFragment | MinimalSykmeldingFragment,
    b: SykmeldingFragment | MinimalSykmeldingFragment,
): number {
    const latestA = (a.__typename === 'Sykmelding' ? a.sykmeldingsperioder : a.sykmelding.sykmeldingsperioder).reduce(
        toLatestTom,
    )
    const latestB = (b.__typename === 'Sykmelding' ? b.sykmeldingsperioder : b.sykmelding.sykmeldingsperioder).reduce(
        toLatestTom,
    )

    return compareAsc(toDate(latestA.tom), toDate(latestB.tom))
}

/**
 * Get a list of sykmelidnger sorted by arbeidsgiver
 * @param {Sykmelding[]} sykmeldinger A list of sykmeldinger
 * @return {Sykmeldinger[]} A new list of sorted sykmeldinger
 */
export function sortSykmeldingerByArbeidsgiver<Sykmelding extends SykmeldingFragment | MinimalSykmeldingFragment>(
    sykmeldinger: Sykmelding[],
): Sykmelding[] {
    if (sykmeldinger.length === 0) return sykmeldinger

    return sortBy(sykmeldinger, [
        (sykmelding) => {
            if (sykmelding.__typename === 'Sykmelding') return sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? ''
            else return sykmelding.arbeidsgiver?.orgNavn ?? ''
        },
        'asc',
    ])
}
