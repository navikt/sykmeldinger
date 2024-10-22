import { ReactElement } from 'react'

import { SykmeldingFragment } from 'queries'

import StatusBanner from '../../../StatusBanner/StatusBanner'
import SykmeldingSykmeldtSection from '../../../Sykmelding/SykmeldingerSykmeldt/SykmeldingSykmeldtSection'
import SykmeldingArbeidsgiverExpansionCard from '../../../Sykmelding/SykmeldingerArbeidsgiver/SykmeldingArbeidsgiverExpansionCard'
import { isUnderbehandling } from '../../../../utils/sykmeldingUtils'
import { UnderBehandlingGuidePanel } from '../../../InformationBanner/InformationBanner'
import InformationBannerSendt from '../../../InformationBanner/InformationBannerSendt'

interface OkSendtSykmeldingProps {
    sykmelding: SykmeldingFragment
}

function OkSendtSykmelding({ sykmelding }: OkSendtSykmeldingProps): ReactElement {
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
                    <UnderBehandlingGuidePanel />
                </div>
            )}

            {sykmelding.merknader != null && <InformationBannerSendt merknader={sykmelding.merknader} />}

            <div className="mb-8">
                <SykmeldingSykmeldtSection sykmelding={sykmelding} shouldShowEgenmeldingsdagerInfo />
            </div>

            <SykmeldingArbeidsgiverExpansionCard sykmelding={sykmelding} />
        </div>
    )
}

export default OkSendtSykmelding
