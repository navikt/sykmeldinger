import React, { ReactElement, Suspense } from 'react'
import { Heading } from '@navikt/ds-react/esm/typography'

import { rscApolloClient } from '../_apollo'
import { SykmeldingerDocument } from '../../fetching/graphql.generated'
import { filterSykmeldinger } from '../../utils/sykmeldingFilterUtils'
import SykmeldingLinkPanel from '../../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import { SykmeldingInfoAccordion } from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'

export const dynamic = 'force-dynamic'

async function SykmeldingerPage(): Promise<ReactElement> {
    return (
        <>
            <PageHeader title="Dine Sykmeldinger" />
            <Suspense fallback={<SykmeldingSkeleton />}>
                <SykmeldingList />
            </Suspense>
        </>
    )
}

async function SykmeldingList(): Promise<ReactElement> {
    const client = rscApolloClient()
    const sykmeldinger = await client.query({
        query: SykmeldingerDocument,
    })

    if (sykmeldinger.error) {
        return <div>En feil oppsto under lasting av sykmeldingene.</div>
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(sykmeldinger.data.sykmeldinger)

    return (
        <div>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />
            <SykmeldingInfoAccordion />
            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </div>
    )
}

function SykmeldingSkeleton(): ReactElement {
    return (
        <div>
            <div className="flex animate-pulse flex-col">
                <div className="mb-2 h-8 w-1/6 rounded bg-gray-400"></div>
                <div className="h-32 w-full rounded bg-gray-400"></div>
                <div className="mb-2 mt-16 h-8 w-18 rounded bg-gray-400"></div>
                <div className="flex flex-col gap-4">
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                    <div className="h-32 w-full rounded bg-gray-400"></div>
                </div>
            </div>
        </div>
    )
}

function PageHeader({ title }: { title: string }): ReactElement {
    return (
        <div className="mb-8 flex items-center">
            <Heading size="xlarge" level="1">
                {title}
            </Heading>
        </div>
    )
}

export default SykmeldingerPage
