import { isBefore, isEqual } from 'date-fns';

import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { isInactiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils';

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

    const startDate: Date = sykmelding.getSykmeldingStartDate();
    const relevantSykmeldinger = sykmeldinger
        .filter((it) => !isInactiveSykmelding(it) && !isUnderbehandling(it))
        .filter((it) => !isEqual(it.getSykmeldingStartDate(), startDate));

    const earliestSykmelding: Sykmelding = relevantSykmeldinger.reduce(
        (acc, value) => (isBefore(value.getSykmeldingStartDate(), acc.getSykmeldingStartDate()) ? value : acc),
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
