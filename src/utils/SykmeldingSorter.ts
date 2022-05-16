import dayjs from 'dayjs';

import { getSykmeldingStartDate, Sykmelding } from '../models/Sykmelding/Sykmelding';

/** Class with utility functions for sorting sykmeldinger. */
class SykmeldingSorter {
    /**
     * Get a list of sykmelidnger sorted by newest date.
     * @param {Sykmelding[]} sykmeldinger A list of sykmeldinger
     * @return {Sykmeldinger[]} A new list of sorted sykmeldinger
     */
    static sortSykmeldingerByDate(sykmeldinger: Sykmelding[]): Sykmelding[] {
        return [...sykmeldinger].sort((a, b) => {
            if (dayjs(getSykmeldingStartDate(a)).isAfter(dayjs(getSykmeldingStartDate(b)))) {
                return -1;
            } else if (dayjs(getSykmeldingStartDate(a)).isBefore(getSykmeldingStartDate(b))) {
                return 0;
            }
            return 1;
        });
    }

    /**
     * Get a list of sykmelidnger sorted by arbeidsgiver
     * @param {Sykmelding[]} sykmeldinger A list of sykmeldinger
     * @return {Sykmeldinger[]} A new list of sorted sykmeldinger
     */
    static sortSykmeldingerByArbeidsgiver(sykmeldinger: Sykmelding[]): Sykmelding[] {
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
}

export default SykmeldingSorter;
