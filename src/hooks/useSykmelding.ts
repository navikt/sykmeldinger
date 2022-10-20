import { useQuery, QueryResult } from '@apollo/client';
import { useEffect } from 'react';
import { logger } from '@navikt/next-logger';

import { SykmeldingDocument, SykmeldingQuery, SykmeldingQueryVariables } from '../fetching/graphql.generated';

function useSykmelding(sykmeldingId: string): QueryResult<SykmeldingQuery, SykmeldingQueryVariables> {
    useEffect(() => {
        logger.info(`Client: Fetching sykmelding with id ${sykmeldingId}`);
    }, [sykmeldingId]);
    return useQuery(SykmeldingDocument, {
        variables: {
            id: sykmeldingId,
        },
    });
}

export default useSykmelding;
