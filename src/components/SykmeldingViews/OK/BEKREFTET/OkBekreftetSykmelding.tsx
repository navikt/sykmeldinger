import React from 'react'
import { Alert, Button, Loader } from '@navikt/ds-react'
import { FillForms } from '@navikt/ds-icons'

import { Sykmelding, SykmeldingChangeStatus } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import Spacing from '../../../Spacing/Spacing'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam'
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations'
import { useAmplitude, useLogAmplitudeEvent } from '../../../../amplitude/amplitude'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'

interface OkBekreftetSykmeldingProps {
    sykmelding: Sykmelding
}

const skjemanavn = 'ok gjenåpne bekreftet sykmelding'

const OkBekreftetSykmelding: React.FC<OkBekreftetSykmeldingProps> = ({ sykmelding }) => {
    const logEvent = useAmplitude()
    useLogAmplitudeEvent({ eventName: 'skjema åpnet', data: { skjemanavn } })
    useHotjarTrigger('SYKMELDING_OK_BEKREFTET')
    const sykmeldingId = useGetSykmeldingIdParam()
    const [{ loading, error }, gjenapne] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Gjenapne,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    )

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
                        <Button size="small" variant="secondary" disabled={loading} onClick={() => gjenapne()}>
                            <FillForms />
                            <span>GJØR UTFYLLINGEN PÅ NYTT</span>
                            {loading && <Loader size="xsmall" />}
                        </Button>
                    </Spacing>
                    {error && (
                        <Alert variant="error" role="alert" aria-live="polite">
                            En feil oppstod som gjorde at sykmeldingen ikke kunne gjenapnes. Prøv igjen senere.
                        </Alert>
                    )}
                </Spacing>
            )}

            <SykmeldingSykmeldtContainer sykmelding={sykmelding} />
        </div>
    )
}

export default OkBekreftetSykmelding
