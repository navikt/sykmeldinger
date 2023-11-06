import { ReactElement } from 'react'
import { Tag } from '@navikt/ds-react'

import { RegelStatus, StatusEvent } from 'queries'

interface LenkepanelEtikettProps {
    status: StatusEvent
    behandlingsutfall: RegelStatus
}

function LenkepanelEtikett({ status, behandlingsutfall }: LenkepanelEtikettProps): ReactElement | null {
    if (behandlingsutfall === 'INVALID') {
        if (status === 'APEN' || status === 'BEKREFTET') {
            return (
                <Tag variant="warning" size="small">
                    Avvist av NAV
                </Tag>
            )
        }
    }

    switch (status) {
        case 'AVBRUTT':
            return (
                <Tag variant="error" size="small">
                    Avbrutt av deg
                </Tag>
            )
        case 'SENDT':
            return (
                <Tag variant="success" size="small">
                    Sendt til arbeidsgiver
                </Tag>
            )
        case 'UTGATT':
            return (
                <Tag variant="info" size="small">
                    Utgått
                </Tag>
            )
        case 'BEKREFTET':
            return (
                <Tag variant="success" size="small">
                    Sendt til NAV
                </Tag>
            )
        default:
            return null
    }
}

export default LenkepanelEtikett
