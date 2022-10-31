import { QueryResult, useQuery } from '@apollo/client'

import { ExtraFormDataDocument, ExtraFormDataQuery, ExtraFormDataQueryVariables } from '../fetching/graphql.generated'

function useExtraFormData(sykmeldingId: string): QueryResult<ExtraFormDataQuery, ExtraFormDataQueryVariables> {
    return useQuery(ExtraFormDataDocument, {
        variables: { sykmeldingId },
    })
}

export default useExtraFormData
