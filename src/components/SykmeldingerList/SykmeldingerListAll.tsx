import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { groupBy } from 'remeda'

import useSykmeldinger from '../../hooks/useSykmeldinger'
import useFocusRefetch from '../../hooks/useFocusRefetch'
import SykmeldingLinkPanel from '../SykmeldingLinkPanel/SykmeldingLinkPanel'
import { SerIkkeSykmelding, InfoOmDigitalSykmelding } from '../InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import { SykmeldingFragment } from '../../fetching/graphql.generated'
import { isActiveSykmelding, isUnderbehandling } from '../../utils/sykmeldingUtils'

import { SykmeldingerListSkeleton } from './SykmeldingerSkeletons'

function SykmeldingerListAll(): ReactElement {
    const { data, error, loading, refetch } = useSykmeldinger()

    useFocusRefetch(refetch)

    if (data?.sykmeldinger == null && loading) {
        return <SykmeldingerListSkeleton />
    }

    if (error) {
        return (
            <Alert variant="error" role="alert" aria-live="polite">
                Vi har problemer med baksystemene for øyeblikket.
            </Alert>
        )
    }
    if (data?.sykmeldinger == null) {
        logger.error('Sykmeldinger is undefined')
        return (
            <Alert variant="error" role="alert" aria-live="polite">
                En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
            </Alert>
        )
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger)

    return (
        <div>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />

            <InfoOmDigitalSykmelding />
            <SerIkkeSykmelding />
        </div>
    )
}

type SykmeldingSections = {
    apenSykmeldinger: SykmeldingFragment[]
    pastSykmeldinger: SykmeldingFragment[]
    underBehandling: SykmeldingFragment[]
}

const groupByPredicate = (sykmelding: SykmeldingFragment): keyof SykmeldingSections => {
    if (isUnderbehandling(sykmelding)) return 'underBehandling'
    else if (isActiveSykmelding(sykmelding)) return 'apenSykmeldinger'
    else return 'pastSykmeldinger'
}

function filterSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]): SykmeldingSections {
    const grouped: Record<keyof SykmeldingSections, SykmeldingFragment[]> = groupBy(sykmeldinger, groupByPredicate)

    return {
        apenSykmeldinger: grouped.apenSykmeldinger ?? [],
        pastSykmeldinger: grouped.pastSykmeldinger ?? [],
        underBehandling: grouped.underBehandling ?? [],
    }
}

export default SykmeldingerListAll
