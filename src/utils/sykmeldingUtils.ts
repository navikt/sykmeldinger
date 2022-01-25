import dayjs from 'dayjs';

import { Sykmelding } from '../models/Sykmelding/Sykmelding';

export function isInactiveSykmelding(sykmelding: Sykmelding) {
    if (isUnderbehandling(sykmelding)) {
        return false;
    }

    const isSykmeldingApen = sykmelding.sykmeldingStatus.statusEvent === 'APEN';
    const isSykmelding3MonthsOld = dayjs(sykmelding.getSykmeldingEndDate()).isBefore(dayjs().subtract(3, 'months'));

    return !isSykmeldingApen || isSykmelding3MonthsOld;
}

export function isUnderbehandling(sykmelding: Sykmelding): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === 'SENDT' &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    );
}
