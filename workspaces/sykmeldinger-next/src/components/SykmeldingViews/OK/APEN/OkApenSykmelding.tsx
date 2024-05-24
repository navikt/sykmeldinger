import { ReactElement } from 'react'
import { GuidePanel } from '@navikt/ds-react'

import { Periodetype, SykmeldingFragment } from 'queries'

import InformationBanner from '../../../InformationBanner/InformationBanner'
import ForceUseOlderSykmelding from '../../../ForceOrder/ForceUseOlderSykmelding'
import SykmeldingSykmeldtSection from '../../../Sykmelding/SykmeldingerSykmeldt/SykmeldingSykmeldtSection'
import SendSykmeldingForm from '../../../SendSykmelding/SendSykmeldingForm'

import PapirInfoheader from './PapirInfoheader'

type OkApenSykmeldingProps = {
    sykmelding: SykmeldingFragment
    olderSykmeldingId: string | null
    olderSykmeldingCount: number
    onSykmeldingAvbrutt: () => void
}

function OkApenSykmelding({
    sykmelding,
    olderSykmeldingId,
    olderSykmeldingCount,
    onSykmeldingAvbrutt,
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

                <SykmeldingSykmeldtSection sykmelding={sykmelding} />
            </div>
        )
    }

    return (
        <div className="sykmelding-container">
            {!olderSykmeldingId && (
                <div className="mb-8">
                    <InformationBanner
                        merknader={sykmelding.merknader}
                        papirsykmelding={sykmelding.papirsykmelding}
                        isUnder20Percent={
                            sykmelding.sykmeldingsperioder.find(
                                (it) => it.type === Periodetype.GRADERT && it.gradert != null && it.gradert?.grad < 20,
                            )?.gradert?.grad ?? null
                        }
                        overSyttiAar={sykmelding.pasient?.overSyttiAar}
                    />
                </div>
            )}

            {Boolean(sykmelding.papirsykmelding) && (
                <div className="mb-16">
                    <PapirInfoheader />
                </div>
            )}

            <div className="mb-8">
                <SykmeldingSykmeldtSection sykmelding={sykmelding} />
            </div>
            <SendSykmeldingForm sykmelding={sykmelding} onSykmeldingAvbrutt={onSykmeldingAvbrutt} />
        </div>
    )
}

export default OkApenSykmelding
