import { Pasient } from '../fetching/graphql.generated';

export function getPasientName(pasient: Pasient): string | undefined {
    if (!pasient.fornavn) return undefined;

    return `${pasient.fornavn}${pasient.mellomnavn ? ' ' + pasient.mellomnavn : ''}${
        pasient.etternavn ? ' ' + pasient.etternavn : ''
    }`;
}
