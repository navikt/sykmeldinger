import dayjs from 'dayjs';
import { Periode, Sykmelding } from '../types/sykmelding';

export function sorterPerioderEldsteFoerst(perioder: Periode[]) {
    return perioder.sort(({ fom }, { tom }) => {
        if (dayjs(fom).isBefore(tom)) {
            return -1;
        } else if (dayjs(fom).isSame(tom)) {
            return 0;
        }
        return 1;
    });
}

// TODO: Refactor
export function sortSykmeldingerNewestFirst(sykmeldinger: Sykmelding[]): Sykmelding[] {
    const newestPeriode = (a: Periode, b: Periode) => {
        if (dayjs(a.fom).isAfter(dayjs(b.fom))) {
            return -1;
        } else if (dayjs(a.fom).isSame(b.fom)) {
            return 0;
        }
        return 1;
    };

    return sykmeldinger.sort((a, b) => {
        const s1 = a.sykmeldingsperioder.sort(newestPeriode);
        const s2 = b.sykmeldingsperioder.sort(newestPeriode);
        if (dayjs(s1[0].fom).isAfter(dayjs(s2[0].fom))) {
            return -1;
        } else if (dayjs(s1[0].fom).isSame(dayjs(s2[0].fom))) {
            return 0;
        }
        return 1;
    });
}

// TODO: Implement
export function sortSykmeldingerArbeidsgiver(sykmeldinger: Sykmelding[]): Sykmelding[] {
    return sykmeldinger.reverse();
}
