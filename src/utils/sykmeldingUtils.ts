import dayjs from 'dayjs';
import Periode from '../types/sykmelding/Periode';
import { tilLesbarPeriodeMedArstall } from './datoUtils';

export const getTotalSykmeldingLenghtReadableString = (sykmeldingsperioder: Periode[]) => {
    const earliestFomPeriod = sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    });

    const latestTomPeriod = sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isAfter(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    });

    const fom = earliestFomPeriod.fom;
    const tom = latestTomPeriod.tom;

    return tilLesbarPeriodeMedArstall(fom, tom);
};
