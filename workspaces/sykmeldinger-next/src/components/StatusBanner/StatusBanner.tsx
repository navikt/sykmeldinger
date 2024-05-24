import { ReactElement } from 'react'
import { Alert, Detail, Heading } from '@navikt/ds-react'

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
                <Heading size="small" level="2" className="overflow-anywhere">
                    {isEgenmeldingsKvittering
                        ? `Egenmeldingsdagene ble sendt til ${sykmeldingStatus.arbeidsgiver?.orgNavn}`
                        : `Sykmeldingen ble sendt til ${sykmeldingStatus.arbeidsgiver?.orgNavn}`}
                </Heading>
                <Detail>{toReadableDate(sykmeldingStatus.timestamp)}</Detail>
            </Alert>
        )
    }

    if (sykmeldingStatus.statusEvent === 'BEKREFTET') {
        return (
            <Alert variant="success">
                <Heading size="small" level="2">
                    {egenmeldt ? 'Egenmeldingen ble sendt til NAV' : 'Sykmeldingen ble sendt til NAV'}
                </Heading>
                <Detail>{toReadableDate(sykmeldingStatus.timestamp)}</Detail>
            </Alert>
        )
    }

    return null
}

export default StatusBanner
