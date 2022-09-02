import { compareAsc } from 'date-fns';
import { sortBy } from 'remeda';

import { Sykmelding, SykmeldingFragment } from '../fetching/graphql.generated';

import { toLatestTom } from './sykmeldingUtils';
import { toDate } from './dateUtils';

export function sykmeldingByDateAsc(a: SykmeldingFragment, b: SykmeldingFragment): number {
    const latestA = a.sykmeldingsperioder.reduce(toLatestTom);
    const latestB = b.sykmeldingsperioder.reduce(toLatestTom);

    return compareAsc(toDate(latestA.tom), toDate(latestB.tom));
}

/**
 * Get a list of sykmelidnger sorted by arbeidsgiver
 * @param {Sykmelding[]} sykmeldinger A list of sykmeldinger
 * @return {Sykmeldinger[]} A new list of sorted sykmeldinger
 */
export function sortSykmeldingerByArbeidsgiver(sykmeldinger: Sykmelding[]): Sykmelding[] {
    if (sykmeldinger.length === 0) return sykmeldinger;

    return sortBy(sykmeldinger, [(sykmelding) => sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn ?? '', 'asc']);
}
