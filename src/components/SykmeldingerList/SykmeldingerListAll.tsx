import React, { PropsWithChildren, ReactElement } from 'react'
import { Accordion, Alert, Heading, Skeleton } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { groupBy, range } from 'remeda'

import useSykmeldinger from '../../hooks/useSykmeldinger'
import useFocusRefetch from '../../hooks/useFocusRefetch'
import SykmeldingLinkPanel from '../SykmeldingLinkPanel/SykmeldingLinkPanel'
import { InfoOmDigitalSykmelding, SerIkkeSykmelding } from '../InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import PageWrapper from '../PageWrapper/PageWrapper'
import TilHovedsiden from '../TilHovedsiden/TilHovedsiden'
import { SykmeldingFragment } from '../../fetching/graphql.generated'
import { isActiveSykmelding, isUnderbehandling } from '../../utils/sykmeldingUtils'

function SykmeldingerListAll(): ReactElement {
    const { data, error, loading, refetch } = useSykmeldinger()

    useFocusRefetch(refetch)

    if (data?.sykmeldinger == null && loading) {
        return (
            <IndexWrapper>
                <SykmeldingerListSkeleton />
            </IndexWrapper>
        )
    }

    if (error) {
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </IndexWrapper>
        )
    }
    if (data?.sykmeldinger == null) {
        logger.error('Sykmeldinger is undefined')
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </IndexWrapper>
        )
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger)

    return (
        <IndexWrapper>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <Accordion>
                <InfoOmDigitalSykmelding />
                <SerIkkeSykmelding />
            </Accordion>

            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </IndexWrapper>
    )
}

type SykmeldingSections = {
    apenSykmeldinger: SykmeldingFragment[]
    pastSykmeldinger: SykmeldingFragment[]
    underBehandling: SykmeldingFragment[]
}

function IndexWrapper({ children }: PropsWithChildren): ReactElement {
    useUpdateBreadcrumbs(() => [])

    return (
        <PageWrapper>
            {children}
            <div className="mt-16">
                <TilHovedsiden />
            </div>
        </PageWrapper>
    )
}

function SykmeldingerListSkeleton(): ReactElement {
    return (
        <section aria-labelledby="sykmeldinger-list-skeleton">
            <Heading size="small" level="2" hidden id="sykmeldinger-list-skeleton">
                Henter dine sykmeldinger
            </Heading>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2" />
            <SingleSykmeldingSkeleton />
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                <SingleSykmeldingSkeleton />
                <SingleSykmeldingSkeleton />
            </div>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                {range(0, 10).map((index) => (
                    <SingleSykmeldingSkeleton key={index} />
                ))}
            </div>
        </section>
    )
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

function SingleSykmeldingSkeleton(): ReactElement {
    return (
        <div className="flex rounded border border-border-subtle p-6 max-[560px]:flex-col">
            <div className="mr-8 max-[560px]:hidden">
                <Skeleton variant="circle" width="48px" height="48px" />
            </div>
            <div className="grow">
                <Skeleton width="29%" />
                <Skeleton width="20%" height="2rem" />
                <Skeleton width="49%" />
            </div>
            <div className="mr-16 mt-2 flex items-center">
                <Skeleton width="120px" />
            </div>
        </div>
    )
}

export default SykmeldingerListAll
