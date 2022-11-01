import { QueryResult, useApolloClient, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { logger } from '@navikt/next-logger'

import {
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    SykmeldingerQuery,
    SykmeldingerQueryVariables,
} from '../fetching/graphql.generated'

export function useSykmeldinger(): QueryResult<SykmeldingerQuery, SykmeldingerQueryVariables> {
    useEffect(() => {
        logger.info(`Client: Fetching sykmeldinger`)
    }, [])
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
