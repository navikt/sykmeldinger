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
    const endDate: Date = sykmelding.getSykmeldingEndDate();
    const relevantSykmeldinger = sykmeldinger
        .filter((it) => !isInactiveSykmelding(it) && !isUnderbehandling(it) && it.id !== sykmelding.id)
        .filter(
            (it) => !(isEqual(it.getSykmeldingStartDate(), startDate) && isEqual(it.getSykmeldingEndDate(), endDate)),
        );
    const earliestSykmelding: Sykmelding | null = relevantSykmeldinger.length
        ? relevantSykmeldinger.reduce((acc, value) =>
              isBefore(value.getSykmeldingStartDate(), startDate) ? value : acc,
          )
        : null;

    return {
        earliestSykmeldingId: earliestSykmelding ? earliestSykmelding.id : null,
        isLoading: false,
        error: null,
    };
}

export default useFindOlderSykmeldingId;
