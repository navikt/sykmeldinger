import dayjs from 'dayjs';
import { Sykmelding } from '../types/sykmelding';
import Periode from '../types/sykmelding/Periode';

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
    const sykmeldingerCopy = [...sykmeldinger];

    return sykmeldingerCopy.sort((a, b) => {
        if (dayjs(a.mottattTidspunkt).isAfter(dayjs(b.mottattTidspunkt))) {
            return -1;
        } else if (dayjs(a.mottattTidspunkt).isBefore(b.mottattTidspunkt)) {
            return 0;
        }
        return 1;
    });
}

// TODO: Implement
export function sortSykmeldingerArbeidsgiver(sykmeldinger: Sykmelding[]): Sykmelding[] {
    const sykmeldingerCopy = [...sykmeldinger];

    return sykmeldingerCopy.sort((a, b) => {
        const arbeidsgiverA = a.sykmeldingStatus.arbeidsgiver?.orgNavn;
        const arbeidsgiverB = b.sykmeldingStatus.arbeidsgiver?.orgNavn;
        // @ts-ignore
        if (arbeidsgiverA > arbeidsgiverB) {
            return 1;
        }
        // @ts-ignore
        if (arbeidsgiverA < arbeidsgiverB) {
            return -1;
        }

        return 0;
    });
}
