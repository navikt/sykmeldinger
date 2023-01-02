import { useQuery, QueryResult } from '@apollo/client'
import { useEffect } from 'react'
import { logger } from '@navikt/next-logger'

import {
    SykmeldingByIdDocument,
    SykmeldingByIdQuery,
    SykmeldingByIdQueryVariables,
} from '../fetching/graphql.generated'

function useSykmeldingById(sykmeldingId: string): QueryResult<SykmeldingByIdQuery, SykmeldingByIdQueryVariables> {
    useEffect(() => {
        logger.info(`Client: Fetching sykmelding with id ${sykmeldingId}`)
    }, [sykmeldingId])
    return useQuery(SykmeldingByIdDocument, {
        variables: {
            id: sykmeldingId,
        },
    })
}

export default useSykmeldingById
