import { MockedResponse } from '@apollo/client/testing';

import { createMock } from '../../../utils/test/dataUtils';
import { Brukerinformasjon, ExtraFormDataDocument, UtenforVentetid } from '../../../fetching/graphql.generated';

export function createExtraFormDataMock({
    sykmeldingId = 'sykmelding-id',
    utenforVentetid = {},
    brukerinformasjon = {},
}: {
    sykmeldingId?: string;
    utenforVentetid?: Partial<UtenforVentetid>;
    brukerinformasjon?: Partial<Brukerinformasjon>;
} = {}): MockedResponse {
    return createMock({
        request: { query: ExtraFormDataDocument, variables: { sykmeldingId } },
        result: {
            data: {
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
                    strengtFortroligAdresse: false,
                    ...brukerinformasjon,
                },
            },
        },
    });
}
