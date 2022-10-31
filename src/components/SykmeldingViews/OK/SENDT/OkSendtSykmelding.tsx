import React from 'react'

import { Sykmelding } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'
import SykmeldingArbeidsgiverContainer from '../../SykmeldingView/SykmeldingArbeidsgiverContainer'
import { isUnderbehandling } from '../../../../utils/sykmeldingUtils'
import { UnderBehandlingGuidePanel } from '../../../InformationBanner/InformationBanner'

interface OkSendtSykmeldingProps {
    sykmelding: Sykmelding
}

function OkSendtSykmelding({ sykmelding }: OkSendtSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_SENDT')

    return (
        <div className="sykmelding-container">
            <Spacing>
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            {isUnderbehandling(sykmelding) && (
                <Spacing>
                    <UnderBehandlingGuidePanel isSent />
                </Spacing>
            )}

            <Spacing>
                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </Spacing>

            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
        </div>
    )
}

export default OkSendtSykmelding
