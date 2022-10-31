export function getBehandlerName<Behandler extends { fornavn: string; mellomnavn?: string | null; etternavn: string }>(
    behandler: Behandler,
): string {
    return `${behandler.fornavn}${behandler.mellomnavn ? ' ' + behandler.mellomnavn : ''} ${behandler.etternavn}`
}
