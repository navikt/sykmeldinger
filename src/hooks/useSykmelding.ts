import { useQuery, QueryResult } from '@apollo/client';
import { useEffect } from 'react';

import { SykmeldingDocument, SykmeldingQuery, SykmeldingQueryVariables } from '../fetching/graphql.generated';
import { logger } from '../utils/logger';

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
