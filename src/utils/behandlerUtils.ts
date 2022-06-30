import { Behandler } from '../fetching/graphql.generated';

export function getBehandlerName(behandler: Behandler): string {
    return `${behandler.fornavn}${behandler.mellomnavn ? ' ' + behandler.mellomnavn : ''} ${behandler.etternavn}`;
}
