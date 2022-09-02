export function getPasientName<
    Pasient extends { fornavn?: string | null; mellomnavn?: string | null; etternavn?: string | null },
>(pasient: Pasient): string | undefined {
    if (!pasient.fornavn) return undefined;

    return `${pasient.fornavn}${pasient.mellomnavn ? ' ' + pasient.mellomnavn : ''}${
        pasient.etternavn ? ' ' + pasient.etternavn : ''
    }`;
}
