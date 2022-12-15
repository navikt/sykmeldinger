import React from 'react'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import { getBehandlerName } from '../../../../utils/behandlerUtils'
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface InvalidBekreftetSykmeldingProps {
    sykmelding: SykmeldingFragment
}

const InvalidBekreftetSykmelding: React.FC<InvalidBekreftetSykmeldingProps> = ({ sykmelding }) => {
    useHotjarTrigger('SYKMELDING_INVALID_BEKREFTET')

    return (
        <div className="sykmelding-container">
            <Spacing amount="large">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    )
}

export default InvalidBekreftetSykmelding
