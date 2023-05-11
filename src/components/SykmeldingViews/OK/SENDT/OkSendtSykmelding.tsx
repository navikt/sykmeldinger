import React from 'react'
import { Alert, BodyShort, Heading, Link as DsLink } from '@navikt/ds-react'
import Link from 'next/link'

import { SykmeldingFragment } from '../../../../fetching/graphql.generated'
import useHotjarTrigger from '../../../../hooks/useHotjarTrigger'
import StatusBanner from '../../../StatusBanner/StatusBanner'
import SykmeldingSykmeldtContainer from '../../SykmeldingView/SykmeldingSykmeldtContainer'
import { isUnderbehandling } from '../../../../utils/sykmeldingUtils'
import { UnderBehandlingGuidePanel } from '../../../InformationBanner/InformationBanner'
import { useFindPrevSykmeldingTom } from '../../../../hooks/useFindPrevSykmeldingTom'
import Spinner from '../../../Spinner/Spinner'
import { hasHitPreviousSykmeldingTom } from '../../../FormComponents/Egenmelding/egenmeldingsdagerFieldUtils'
import SykmeldingArbeidsgiverContainer from '../../SykmeldingView/SykmeldingArbeidsgiverContainer'

interface OkSendtSykmeldingProps {
    sykmelding: SykmeldingFragment
}

function OkSendtSykmelding({ sykmelding }: OkSendtSykmeldingProps): JSX.Element {
    useHotjarTrigger('SYKMELDING_OK_SENDT')

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
                    <UnderBehandlingGuidePanel isSent />
                </div>
            )}

            <div className="mb-8">
                <OkSendtSykmeldingSykmeldtContainer sykmelding={sykmelding} />
            </div>

            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
        </div>
    )
}

function OkSendtSykmeldingSykmeldtContainer({ sykmelding }: { sykmelding: SykmeldingFragment }): JSX.Element {
    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(
        sykmelding,
        sykmelding.sykmeldingStatus.arbeidsgiver?.orgnummer,
    )

    const hasHitPrevious = hasHitPreviousSykmeldingTom(sykmelding, previousSykmeldingTom)

    if (isLoading) {
        return <Spinner headline="Henter sykmeldinger..." />
    }

    if (error) {
        return (
            <Alert variant="error">
                <Heading spacing size="small" level="3">
                    Det skjedde en feil ved lasting av sykmeldingene dine.
                </Heading>
                <BodyShort spacing>
                    Du kan prøve å <Link href="">oppfriske</Link> siden for å se om det løser problemet.
                </BodyShort>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du fortelle oss om feilen på{' '}
                    <DsLink href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        skjemaet for feil og mangler
                    </DsLink>
                    .
                </BodyShort>
            </Alert>
        )
    }

    return <SykmeldingSykmeldtContainer sykmelding={sykmelding} editableEgenmelding={!hasHitPrevious} />
}

export default OkSendtSykmelding
