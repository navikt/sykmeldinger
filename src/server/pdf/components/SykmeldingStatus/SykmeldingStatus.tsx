import { ReactElement } from 'react'

import { Sykmelding } from '../../../api-models/sykmelding/Sykmelding'

import SykmeldingStatusAvbrutt from './SykmeldingStatusAvbrutt'
import SykmeldingStatusUtgatt from './SykmeldingStatusUtgatt'
import SykmeldingStatusAvvist from './SykmeldingStatusAvvist'

interface Props {
    sykmelding: Sykmelding
}

const SykmeldingStatus = ({ sykmelding }: Props): ReactElement | null => {
    const behandlingsutfall = sykmelding.behandlingsutfall.status
    const status = sykmelding.sykmeldingStatus.statusEvent

    switch (behandlingsutfall) {
        case 'INVALID':
            return <SykmeldingStatusAvvist sykmelding={sykmelding} />
        case 'OK':
            switch (status) {
                case 'AVBRUTT':
                    return <SykmeldingStatusAvbrutt sykmelding={sykmelding} />
                case 'UTGATT':
                    return <SykmeldingStatusUtgatt sykmelding={sykmelding} />
            }
            return <SykmeldingStatusAvvist sykmelding={sykmelding} />
        default:
            return null
    }
}

export default SykmeldingStatus
