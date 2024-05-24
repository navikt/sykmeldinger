export function getPasientName<
    Pasient extends { fornavn?: string | null; mellomnavn?: string | null; etternavn?: string | null },
>(pasient: Pasient): string | undefined {
    if (!pasient.fornavn) return undefined

    return `${pasient.fornavn}${pasient.mellomnavn ? ' ' + pasient.mellomnavn : ''}${
        pasient.etternavn ? ' ' + pasient.etternavn : ''
    }`
}

export function fnrText(fnr: string | null | undefined): string {
    return `Fødselsnummer: ${fnr ? `${fnr.substring(0, 6)} ${fnr.substring(6)}` : 'mangler'}`
}
