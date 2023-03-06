import React from 'react'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'
import SykmeldingArbeidsgiverContainer from '../../SykmeldingView/SykmeldingArbeidsgiverContainer'
import { isUnderbehandling } from '../../../../utils/sykmeldingUtils'
import { UnderBehandlingGuidePanel } from '../../../InformationBanner/InformationBanner'

interface OkSendtSykmeldingProps {
    sykmelding: SykmeldingFragment
}

function OkSendtSykmelding({ sykmelding }: OkSendtSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_SENDT')

    return (
        <div className="sykmelding-container">
            <div className="mb-8">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </div>

            {isUnderbehandling(sykmelding) && (
                <div className="mb-8">
                    <UnderBehandlingGuidePanel isSent />
                </div>
            )}

            <div className="mb-8">
                <SykmeldingSykmeldtContainer sykmelding={sykmelding} editableEgenmelding />
            </div>

            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
        </div>
    )
}

export default OkSendtSykmelding
