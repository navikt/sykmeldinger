import React, { ReactElement, Suspense } from 'react'

import { rscApolloClient } from '../_apollo'
import { SykmeldingerDocument } from '../../fetching/graphql.generated'
import { filterSykmeldinger } from '../../utils/sykmeldingFilterUtils'
import SykmeldingLinkPanel from '../../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import { SykmeldingInfoAccordion } from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'

import { PageHeader } from './_shared/page-header'
import SykmeldingerRoot from './_sykmeldinger-root'

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
        <SykmeldingerRoot>
            <SykmeldingLinkPanel
                title="Under behandling"
                type="UNDER_BEHANDLING"
                sykmeldinger={underBehandling}
                useNewRoute
            />
            <SykmeldingLinkPanel
                title="Nye sykmeldinger"
                type="NYE_SYKMELDINGER"
                sykmeldinger={apenSykmeldinger}
                useNewRoute
            />
            <SykmeldingInfoAccordion />
            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
                useNewRoute
            />
        </SykmeldingerRoot>
    )
}

function SykmeldingSkeleton(): ReactElement {
    return (
        <div aria-label="Henter dine sykmeldinger" role="progressbar" aria-busy>
            <div className="flex animate-pulse flex-col" aria-hidden>
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

export default SykmeldingerPage
