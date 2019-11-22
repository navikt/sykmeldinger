import { Periode } from '../types/sykmeldingTypes';
import dayjs from 'dayjs';

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
