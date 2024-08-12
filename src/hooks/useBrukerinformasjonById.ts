import { useQuery, QueryResult } from '@apollo/client'

import { BrukerinformasjonDocument, BrukerinformasjonQuery, BrukerinformasjonQueryVariables } from 'queries'

function useBrukerInformasjonById(
    sykmeldingId: string,
): QueryResult<BrukerinformasjonQuery, BrukerinformasjonQueryVariables> {
    return useQuery(BrukerinformasjonDocument, {
        variables: { sykmeldingId: sykmeldingId },
    })
}

export default useBrukerInformasjonById
