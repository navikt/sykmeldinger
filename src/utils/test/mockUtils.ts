import { MockedResponse } from '@apollo/client/testing'

import { Brukerinformasjon, ExtraFormDataDocument, ExtraFormDataQuery, UtenforVentetid } from 'queries'

import { createMock } from './dataUtils'

export function extraFormData(
    utenforVentetid: Partial<UtenforVentetid> = {},
    brukerinformasjon: Partial<Brukerinformasjon> = {},
): ExtraFormDataQuery {
    return {
        __typename: 'Query',
        sykmeldingUtenforVentetid: {
            __typename: 'UtenforVentetid',
            erUtenforVentetid: true,
            oppfolgingsdato: null,
            ...utenforVentetid,
        },
        brukerinformasjon: {
            __typename: 'Brukerinformasjon',
            arbeidsgivere: [],
            ...brukerinformasjon,
        },
    }
}

export function createExtraFormDataMock({
    sykmeldingId = 'sykmelding-id',
    utenforVentetid = {},
    brukerinformasjon = {},
}: {
    sykmeldingId?: string
    utenforVentetid?: Partial<UtenforVentetid>
    brukerinformasjon?: Partial<Brukerinformasjon>
} = {}): MockedResponse {
    return createMock({
        request: { query: ExtraFormDataDocument, variables: { sykmeldingId } },
        result: {
            data: extraFormData(utenforVentetid, brukerinformasjon),
        },
    })
}
