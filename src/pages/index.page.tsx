import React, { PropsWithChildren, ReactElement } from 'react'
import { Alert, Heading, Skeleton } from '@navikt/ds-react'
import Head from 'next/head'
import { range } from 'remeda'
import { logger } from '@navikt/next-logger'

import useSykmeldinger from '../hooks/useSykmeldinger'
import useHotjarTrigger from '../hooks/useHotjarTrigger'
import { SykmeldingInfoAccordion } from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import SykmeldingLinkPanel from '../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import Header from '../components/Header/Header'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import { withAuthenticatedPage } from '../auth/withAuthentication'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import useFocusRefetch from '../hooks/useFocusRefetch'
import { filterSykmeldinger } from '../utils/sykmeldingFilterUtils'

function SykmeldingerPage(): ReactElement {
    useHotjarTrigger('SYKMELDING_LISTEVISNING')

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
            <SykmeldingInfoAccordion />
            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </IndexWrapper>
    )
}

function IndexWrapper({ children }: PropsWithChildren): ReactElement {
    useUpdateBreadcrumbs(() => [])

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                {children}
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
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

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
