import { isBefore, parseISO } from 'date-fns';

import { Sykmelding } from '../fetching/graphql.generated';
import { getSykmeldingStartDate, isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils';

import useSykmeldinger from './useSykmeldinger';

function useFindOlderSykmeldingId(sykmelding: Sykmelding | undefined): {
    earliestSykmeldingId: string | null;
    isLoading: boolean;
    error: Error | undefined;
} {
    const { data, error, loading } = useSykmeldinger();

    if (sykmelding == null || loading || error || data?.sykmeldinger == null) {
        return {
            earliestSykmeldingId: null,
            isLoading: loading,
            error,
        };
    }

    const startDate: string = getSykmeldingStartDate(sykmelding);
    const relevantSykmeldinger = data?.sykmeldinger
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
        error: undefined,
    };
}

export default useFindOlderSykmeldingId;
