import React from 'react'
import { Button } from '@navikt/ds-react'
import { FillForms } from '@navikt/ds-icons'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '../../../../amplitude/amplitude'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface OkBekreftetSykmeldingProps {
    sykmelding: SykmeldingFragment
    reopen: () => void
}

const skjemanavn = 'ok gjenåpne bekreftet sykmelding'

function OkBekreftetSykmelding({ sykmelding, reopen }: OkBekreftetSykmeldingProps): JSX.Element {
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })
    useHotjarTrigger('SYKMELDING_OK_BEKREFTET')

    return (
        <div className="sykmelding-container">
            <Spacing amount="small">
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                    egenmeldt={sykmelding.egenmeldt}
                />
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
        </div>
    )
}

export default OkBekreftetSykmelding
