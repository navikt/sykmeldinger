import { QueryResult, useQuery } from '@apollo/client'

import { ExtraFormDataDocument, ExtraFormDataQuery, ExtraFormDataQueryVariables } from 'queries'

function useExtraFormData(sykmeldingId: string): QueryResult<ExtraFormDataQuery, ExtraFormDataQueryVariables> {
    return useQuery(ExtraFormDataDocument, {
        variables: { sykmeldingId },
    })
}

export default useExtraFormData
