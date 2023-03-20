'use client'

import React, { useCallback, useState } from 'react'
import { logger } from '@navikt/next-logger'
import { GuidePanel } from '@navikt/ds-react'

import { SykmeldingFragment } from '../../fetching/graphql.generated'
import OkApenSykmelding from '../../components/SykmeldingViews/OK/APEN/OkApenSykmelding'
import OkBekreftetSykmelding from '../../components/SykmeldingViews/OK/BEKREFTET/OkBekreftetSykmelding'
import OkSendtSykmelding from '../../components/SykmeldingViews/OK/SENDT/OkSendtSykmelding'
import OkAvbruttSykmelding from '../../components/SykmeldingViews/OK/AVBRUTT/OkAvbruttSykmelding'
import OkUtgattSykmelding from '../../components/SykmeldingViews/OK/UTGATT/OkUtgattSykmelding'
import InvalidApenSykmelding from '../../components/SykmeldingViews/INVALID/APEN/InvalidApenSykmelding'
import InvalidBekreftetSykmelding from '../../components/SykmeldingViews/INVALID/BEKREFTET/InvalidBekreftetSykmelding'
import { useLogAmplitudeEvent } from '../../amplitude/amplitude'
import { isUtenlandsk } from '../../utils/utenlanskUtils'

function ClientSykmelding({
    sykmelding,
    olderSykmeldingId,
    olderSykmeldingCount,
}: {
    sykmelding: SykmeldingFragment
    olderSykmeldingId: string | null
    olderSykmeldingCount: number
}): JSX.Element | null {
    useLogSykmeldingPageAmplitude(sykmelding, olderSykmeldingCount)

    const [hasReopenedSykmelding, setHasReopenedSykmelding] = useState(false)
    const reopen = useCallback(() => {
        setHasReopenedSykmelding(true)
    }, [])

    const behandlingsutfall = sykmelding.behandlingsutfall.status
    const status = sykmelding.sykmeldingStatus.statusEvent

    switch (behandlingsutfall) {
        case 'OK':
        case 'MANUAL_PROCESSING':
            if (hasReopenedSykmelding) {
                return (
                    <OkApenSykmelding
                        sykmelding={sykmelding}
                        olderSykmeldingId={olderSykmeldingId}
                        olderSykmeldingCount={olderSykmeldingCount}
                    />
                )
            }

            switch (status) {
                case 'APEN':
                    return (
                        <OkApenSykmelding
                            sykmelding={sykmelding}
                            olderSykmeldingId={olderSykmeldingId}
                            olderSykmeldingCount={olderSykmeldingCount}
                        />
                    )
                case 'BEKREFTET':
                    return <OkBekreftetSykmelding sykmelding={sykmelding} reopen={reopen} />
                case 'SENDT':
                    return <OkSendtSykmelding sykmelding={sykmelding} />
                case 'AVBRUTT':
                    return <OkAvbruttSykmelding sykmelding={sykmelding} reopen={reopen} />
                case 'UTGATT':
                    return <OkUtgattSykmelding sykmelding={sykmelding} />
                default:
                    logger.error(`${behandlingsutfall} sykmelding with unsupported status: ${status}`)
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>
            }
        case 'INVALID':
            if (hasReopenedSykmelding) {
                return <InvalidApenSykmelding sykmelding={sykmelding} />
            }

            switch (status) {
                case 'APEN':
                    return <InvalidApenSykmelding sykmelding={sykmelding} />
                case 'BEKREFTET':
                    return <InvalidBekreftetSykmelding sykmelding={sykmelding} />
                default:
                    logger.error(`Avvist sykmelding with unsupported status: ${status}`)
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>
            }
    }

    return null
}

function useLogSykmeldingPageAmplitude(sykmelding: SykmeldingFragment, olderSykmeldingCount: number): void {
    useLogAmplitudeEvent(
        { eventName: 'komponent vist', data: { komponent: 'Sykmelding Page' } },
        {
            status: sykmelding.sykmeldingStatus.statusEvent,
            behandlingsutfall: sykmelding.behandlingsutfall.status,
            hasOlderSykmelding: olderSykmeldingCount > 0,
            isUtenlandsk: isUtenlandsk(sykmelding),
        },
    )
}

export default ClientSykmelding
