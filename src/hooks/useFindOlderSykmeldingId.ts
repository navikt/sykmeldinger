import { isBefore, parseISO } from 'date-fns';

import { getSykmeldingStartDate, Sykmelding } from '../models/Sykmelding/Sykmelding';
import { isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils';

import useSykmeldinger from './useSykmeldinger';

function useFindOlderSykmeldingId(sykmelding: Sykmelding | undefined): {
    earliestSykmeldingId: string | null;
    isLoading: boolean;
    error: Error | null;
} {
    const { isLoading, error, data: sykmeldinger } = useSykmeldinger();

    if (sykmelding == null || isLoading || error || sykmeldinger == null) {
        return {
            earliestSykmeldingId: null,
            isLoading,
            error,
        };
    }

    const startDate: string = getSykmeldingStartDate(sykmelding);
    const relevantSykmeldinger = sykmeldinger
        .filter((it) => isActiveSykmelding(it) && !isUnderbehandling(it))
        .filter((it) => getSykmeldingStartDate(it) !== startDate);

    const earliestSykmelding: Sykmelding = relevantSykmeldinger.reduce(
        (acc, value) =>
            isBefore(parseISO(getSykmeldingStartDate(value)), parseISO(getSykmeldingStartDate(acc))) ? value : acc,
        sykmelding,
    );

    return {
        // When the earliest sykmelding is the provided sykmelding, it's the very first
        earliestSykmeldingId: earliestSykmelding.id === sykmelding.id ? null : earliestSykmelding.id,
        isLoading: false,
        error: null,
    };
}

export default useFindOlderSykmeldingId;
