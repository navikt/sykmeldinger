import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import AvvistVeileder from '../../../AvvistVeileder/AvvistVeileder'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import { getBehandlerName } from '../../../../utils/behandlerUtils'
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface InvalidBekreftetSykmeldingProps {
    sykmelding: SykmeldingFragment
}

function InvalidBekreftetSykmelding({ sykmelding }: InvalidBekreftetSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_INVALID_BEKREFTET')

    return (
        <div className="sykmelding-container">
            <div className="mb-16">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </div>

            <div className="mb-8">
                <AvvistVeileder
                    behandlerNavn={getBehandlerName(sykmelding.behandler)}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                    perioder={sykmelding.sykmeldingsperioder}
                />
            </div>

            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    )
}

export default InvalidBekreftetSykmelding
