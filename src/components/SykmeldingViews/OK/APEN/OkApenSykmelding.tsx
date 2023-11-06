import { ReactElement } from 'react'
import { GuidePanel } from '@navikt/ds-react'

import { SykmeldingFragment } from 'queries'

import InformationBanner from '../../../InformationBanner/InformationBanner'
import ForceUseOlderSykmelding from '../../../ForceOrder/ForceUseOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'
import SendSykmeldingForm from '../../../SendSykmelding/SendSykmeldingForm'

import PapirInfoheader from './PapirInfoheader'

interface OkApenSykmeldingProps {
    sykmelding: SykmeldingFragment
    olderSykmeldingId: string | null
    olderSykmeldingCount: number
}

function OkApenSykmelding({
    sykmelding,
    olderSykmeldingId,
    olderSykmeldingCount,
}: OkApenSykmeldingProps): ReactElement {
    if (olderSykmeldingId) {
        return (
            <ForceUseOlderSykmelding
                olderSykmeldingId={olderSykmeldingId}
                olderSykmeldingCount={olderSykmeldingCount}
            />
        )
    }

    if (sykmelding.egenmeldt) {
        return (
            <div>
                <div className="mb-16">
                    <GuidePanel poster>
                        Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger
                        fra egenmeldingen under.
                    </GuidePanel>
                </div>

                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </div>
        )
    }

    return (
        <div className="sykmelding-container">
            {!olderSykmeldingId && (
                <div className="mb-8">
                    <InformationBanner merknader={sykmelding.merknader} papirsykmelding={sykmelding.papirsykmelding} />
                </div>
            )}

            {Boolean(sykmelding.papirsykmelding) && (
                <div className="mb-16">
                    <PapirInfoheader />
                </div>
            )}

            <div className="mb-8">
                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </div>
            <SendSykmeldingForm sykmelding={sykmelding} />
        </div>
    )
}

export default OkApenSykmelding
