import { ReactElement } from 'react'
import { Alert, BodyShort, Detail } from '@navikt/ds-react'

import { Behandlingsutfall, SykmeldingStatusFragment } from 'queries'

import { toReadableDate } from '../../utils/dateUtils'

interface StatusBannerProps {
    sykmeldingStatus: SykmeldingStatusFragment
    behandlingsutfall: Behandlingsutfall
    isEgenmeldingsKvittering?: boolean
    egenmeldt?: boolean | null
}

function StatusBanner({
    sykmeldingStatus,
    behandlingsutfall,
    isEgenmeldingsKvittering,
    egenmeldt = false,
}: StatusBannerProps): ReactElement | null {
    if (behandlingsutfall.status === 'INVALID') {
        if (sykmeldingStatus.statusEvent === 'BEKREFTET') {
            return (
                <Alert variant="info">
                    {`Du bekreftet at du har lest at sykmeldingen er avvist den ${toReadableDate(
                        sykmeldingStatus.timestamp,
                    )}`}
                </Alert>
            )
        }
    }

    if (sykmeldingStatus.statusEvent === 'SENDT') {
        return (
            <Alert variant="success">
                <BodyShort className="font-bold mb-6">
                    {isEgenmeldingsKvittering
                        ? `Egenmeldingsdagene ble sendt til ${sykmeldingStatus.arbeidsgiver?.orgNavn}.`
                        : `Sykmeldingen ble sendt til ${sykmeldingStatus.arbeidsgiver?.orgNavn}.`}
                    {' Du finner den på Ditt sykefravær. Du får en melding fra oss hvis vi trenger noe mer fra deg.'}
                </BodyShort>
                <Detail>{'Sendt: ' + toReadableDate(sykmeldingStatus.timestamp)}</Detail>
            </Alert>
        )
    }

    if (sykmeldingStatus.statusEvent === 'BEKREFTET') {
        return (
            <Alert variant="success">
                <BodyShort className="font-bold mb-6">
                    {egenmeldt ? 'Egenmeldingen ble sendt til NAV.' : 'Sykmeldingen ble sendt til NAV.'}
                    {' Du finner den på Ditt sykefravær. Du får en melding fra oss hvis vi trenger noe mer fra deg.'}
                </BodyShort>
                <Detail>{'Sendt: ' + toReadableDate(sykmeldingStatus.timestamp)}</Detail>
            </Alert>
        )
    }

    return null
}

export default StatusBanner
