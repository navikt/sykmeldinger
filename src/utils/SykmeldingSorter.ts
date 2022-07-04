import { compareAsc } from 'date-fns';

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
    return [...sykmeldinger].sort((a, b) => {
        if (a.sykmeldingStatus.arbeidsgiver?.orgNavn && b.sykmeldingStatus.arbeidsgiver?.orgNavn) {
            if (a.sykmeldingStatus.arbeidsgiver.orgNavn > b.sykmeldingStatus.arbeidsgiver.orgNavn) {
                return 1;
            }
            if (a.sykmeldingStatus.arbeidsgiver.orgNavn < b.sykmeldingStatus.arbeidsgiver.orgNavn) {
                return -1;
            }
        }
        return 0;
    });
}
