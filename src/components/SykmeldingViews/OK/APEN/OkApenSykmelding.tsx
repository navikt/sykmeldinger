import { GuidePanel } from '@navikt/ds-react'

import { Sykmelding } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import InformationBanner from '../../../InformationBanner/InformationBanner'
import ForceUseOlderSykmelding from '../../../ForceOrder/ForceUseOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

import AvbrytPanel from './AvbrytPanel/AvbrytPanel'
import AvbrytContextProvider from './AvbrytContext'
import PapirInfoheader from './PapirInfoheader'
import Form from './Form/Form'

interface OkApenSykmeldingProps {
    sykmelding: Sykmelding
    olderSykmeldingId: string | null
    olderSykmeldingCount: number
}

function OkApenSykmelding({ sykmelding, olderSykmeldingId, olderSykmeldingCount }: OkApenSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_APEN')

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
                <Spacing amount="large">
                    <GuidePanel poster>
                        Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger
                        fra egenmeldingen under.
                    </GuidePanel>
                </Spacing>

                <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </div>
        )
    }

    return (
        <AvbrytContextProvider>
            <div className="sykmelding-container">
                {!olderSykmeldingId && (
                    <Spacing>
                        <InformationBanner
                            merknader={sykmelding.merknader}
                            papirsykmelding={sykmelding.papirsykmelding}
                        />
                    </Spacing>
                )}

                {Boolean(sykmelding.papirsykmelding) && (
                    <Spacing amount="large">
                        <PapirInfoheader />
                    </Spacing>
                )}

                <Spacing>
                    <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
                </Spacing>
                <Form sykmelding={sykmelding} />
                <AvbrytPanel />
            </div>
        </AvbrytContextProvider>
    )
}

export default OkApenSykmelding
