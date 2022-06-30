import { Behandler } from '../../../api-models/sykmelding/Behandler';
import { Pasient } from '../../../api-models/sykmelding/Pasient';

export function getPasientName(pasient: Pasient): string | undefined {
    if (!pasient.fornavn) return undefined;

    return `${pasient.fornavn}${pasient.mellomnavn ? ' ' + pasient.mellomnavn : ''}${
        pasient.etternavn ? ' ' + pasient.etternavn : ''
    }`;
}

export function getBehandlerName(behandler: Behandler): string {
    return `${behandler.fornavn}${behandler.mellomnavn ? ' ' + behandler.mellomnavn : ''} ${behandler.etternavn}`;
}
