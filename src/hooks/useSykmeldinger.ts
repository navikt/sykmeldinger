import { QueryResult, useApolloClient, useQuery } from '@apollo/client';

import {
    SykmeldingDocument,
    SykmeldingerDocument,
    SykmeldingerQuery,
    SykmeldingerQueryVariables,
} from '../fetching/graphql.generated';

export function useSykmeldinger(): QueryResult<SykmeldingerQuery, SykmeldingerQueryVariables> {
    const client = useApolloClient();
    return useQuery(SykmeldingerDocument, {
        onCompleted: (result) => {
            result.sykmeldinger?.forEach((sykmelding) => {
                client.writeQuery({
                    query: SykmeldingDocument,
                    variables: { id: sykmelding.id },
                    data: { __typename: 'Query', sykmelding },
                });
            });
        },
    });
}

export default useSykmeldinger;
