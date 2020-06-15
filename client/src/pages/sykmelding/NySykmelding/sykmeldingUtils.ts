import { Sykmelding } from '../../../types/sykmeldingTypes';
import dayjs from 'dayjs';
import { tilLesbarPeriodeMedArstall } from '../../../utils/datoUtils';

export const getSykmeldingPeriod = (sykmelding: Sykmelding) => {
    const periods = sykmelding.perioder;

    const earliestFomPeriod = periods.reduce((acc, value) => {
        if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    });

    const latestTomPeriod = periods.reduce((acc, value) => {
        if (dayjs(value.fom).isAfter(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    });

    const fom = earliestFomPeriod.fom;
    const tom = latestTomPeriod.tom;

    return tilLesbarPeriodeMedArstall(fom, tom);
};
