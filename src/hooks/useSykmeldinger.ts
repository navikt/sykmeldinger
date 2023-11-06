import { QueryResult, useApolloClient, useQuery } from '@apollo/client'

import { SykmeldingByIdDocument, SykmeldingerDocument, SykmeldingerQuery, SykmeldingerQueryVariables } from 'queries'

export function useSykmeldinger(): QueryResult<SykmeldingerQuery, SykmeldingerQueryVariables> {
    const client = useApolloClient()
    return useQuery(SykmeldingerDocument, {
        onCompleted: (result) => {
            result.sykmeldinger?.forEach((sykmelding) => {
                client.writeQuery({
                    query: SykmeldingByIdDocument,
                    variables: { id: sykmelding.id },
                    data: { __typename: 'Query', sykmelding },
                })
            })
        },
    })
}

export default useSykmeldinger
