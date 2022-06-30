import { useQuery, QueryResult } from '@apollo/client';

import { SykmeldingDocument, SykmeldingQuery, SykmeldingQueryVariables } from '../fetching/graphql.generated';

function useSykmelding(sykmeldingId: string): QueryResult<SykmeldingQuery, SykmeldingQueryVariables> {
    return useQuery(SykmeldingDocument, {
        variables: {
            id: sykmeldingId,
        },
    });
}

export default useSykmelding;
