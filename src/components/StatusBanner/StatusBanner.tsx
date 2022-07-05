import { Element, Systemtittel } from 'nav-frontend-typografi';
import { Alert } from '@navikt/ds-react';

import { Behandlingsutfall, SykmeldingStatus } from '../../fetching/graphql.generated';
import { toReadableDate } from '../../utils/dateUtils';

interface StatusBannerProps {
    sykmeldingStatus: SykmeldingStatus;
    behandlingsutfall: Behandlingsutfall;
    egenmeldt?: boolean | null;
}

function StatusBanner({
    sykmeldingStatus,
    behandlingsutfall,
    egenmeldt = false,
}: StatusBannerProps): JSX.Element | null {
    if (behandlingsutfall.status === 'INVALID') {
        if (sykmeldingStatus.statusEvent === 'BEKREFTET') {
            return (
                <Alert variant="info">
                    Du bekreftet at du har lest at sykmeldingen er avvist den{' '}
                    {toReadableDate(sykmeldingStatus.timestamp)}
                </Alert>
            );
        }
    }

    if (sykmeldingStatus.statusEvent === 'SENDT') {
        return (
            <Alert variant="success">
                <Systemtittel tag="h2">
                    Sykmeldingen ble sendt til {sykmeldingStatus.arbeidsgiver?.orgNavn}
                </Systemtittel>
                <Element>{toReadableDate(sykmeldingStatus.timestamp)}</Element>
            </Alert>
        );
    }

    if (sykmeldingStatus.statusEvent === 'BEKREFTET') {
        return (
            <Alert variant="success">
                <Systemtittel tag="h2">{egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble sendt til NAV</Systemtittel>
                <Element>{toReadableDate(sykmeldingStatus.timestamp)}</Element>
            </Alert>
        );
    }

    return null;
}

export default StatusBanner;
