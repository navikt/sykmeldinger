import { ReactElement } from 'react'
import { Alert, Button, Detail, Heading } from '@navikt/ds-react'
import { FillForms } from '@navikt/ds-icons'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import { toReadableDate } from '../../../../utils/dateUtils'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../../../amplitude/amplitude'
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface OkAvbruttSykmeldingProps {
    sykmelding: SykmeldingFragment
    reopen: () => void
}

const skjemanavn = 'gjenåpne avbrutt sykmelding'

function OkAvbruttSykmelding({ sykmelding, reopen }: OkAvbruttSykmeldingProps): ReactElement {
    useHotjarTrigger('SYKMELDING_OK_AVBRUTT')
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    return (
        <div className="sykmelding-container">
            <div className="mb-4">
                <Alert variant="info">
                    <Heading size="small" level="2">
                        {sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble avbrutt av deg
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </div>
            {!Boolean(sykmelding.egenmeldt) && (
                <div className="mb-8">
                    <div className="mb-4">
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => {
                                logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } })
                                reopen()
                            }}
                            icon={<FillForms aria-hidden />}
                        >
                            GJØR UTFYLLINGEN PÅ NYTT
                        </Button>
                    </div>
                </div>
            )}
            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    )
}

export default OkAvbruttSykmelding
