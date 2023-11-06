import { useQuery, QueryResult } from '@apollo/client'

import { SykmeldingByIdDocument, SykmeldingByIdQuery, SykmeldingByIdQueryVariables } from 'queries'

function useSykmeldingById(sykmeldingId: string): QueryResult<SykmeldingByIdQuery, SykmeldingByIdQueryVariables> {
    return useQuery(SykmeldingByIdDocument, {
        variables: { id: sykmeldingId },
    })
}

export default useSykmeldingById
