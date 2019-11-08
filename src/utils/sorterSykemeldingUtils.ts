import { Periode } from '../types/sykmeldingTypes';

export function sorterPerioderEldsteFoerst(perioder: Periode[]) {
    return perioder.sort(({ fom }, { tom }) => {
        return fom.getTime() - tom.getTime();
    });
}
