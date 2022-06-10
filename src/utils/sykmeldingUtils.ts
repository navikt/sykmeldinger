import { differenceInDays, parseISO } from 'date-fns';

import { Sykmelding } from '../models/Sykmelding/Sykmelding';

export function isActiveSykmelding(sykmelding: Sykmelding): boolean {
    // Under behandling skal alltids vises, uansett hvor gammel
    if (isUnderbehandling(sykmelding)) return true;
    // Alt som ikke er APEN status, er inaktive
    if (sykmelding.sykmeldingStatus.statusEvent !== 'APEN') return false;
    // APEN sykmeldinger blir inaktive etter 12 måneder
    return differenceInDays(new Date(), parseISO(sykmelding.mottattTidspunkt)) < 365;
}

export function isUnderbehandling(sykmelding: Sykmelding): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === 'SENDT' &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    );
}

export function getBirthday(fnr: string): string {
    return fnr.substring(0, 6) + '*****';
}
