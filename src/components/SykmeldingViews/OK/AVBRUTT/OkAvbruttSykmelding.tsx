import React from 'react'
import { Alert, Button, Detail, Heading } from '@navikt/ds-react'
import { FillForms } from '@navikt/ds-icons'

import { Sykmelding } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import { toReadableDate } from '../../../../utils/dateUtils'
import Spacing from '../../../Spacing/Spacing'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../../../amplitude/amplitude'
import HintToNextOlderSykmelding from '../../../ForceOrder/HintToNextOlderSykmelding'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface OkAvbruttSykmeldingProps {
    sykmelding: Sykmelding
    reopen: () => void
}

const skjemanavn = 'gjenåpne avbrutt sykmelding'

function OkAvbruttSykmelding({ sykmelding, reopen }: OkAvbruttSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_AVBRUTT')
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })

    return (
        <div className="sykmelding-container">
            <Spacing amount="small">
                <Alert variant="info">
                    <Heading size="small" level="2">
                        {sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}en ble avbrutt av deg
                    </Heading>
                    <Detail>{toReadableDate(sykmelding.sykmeldingStatus.timestamp)}</Detail>
                </Alert>
            </Spacing>
            {!Boolean(sykmelding.egenmeldt) && (
                <Spacing>
                    <Spacing amount="small">
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => {
                                logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn } })
                                reopen()
                            }}
                            icon={<FillForms />}
                        >
                            GJØR UTFYLLINGEN PÅ NYTT
                        </Button>
                    </Spacing>
                </Spacing>
            )}
            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />

            <HintToNextOlderSykmelding />
        </div>
    )
}

export default OkAvbruttSykmelding
