import React, { ReactElement, Suspense } from 'react'
import { range } from 'remeda'

import { rscApolloClient } from '../_apollo'
import { SykmeldingerDocument } from '../../fetching/graphql.generated'
import { filterSykmeldinger } from '../../utils/sykmeldingFilterUtils'
import SykmeldingLinkPanel from '../../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import { SykmeldingInfoAccordion } from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'

import { PageHeader } from './_shared/page-header'
import SykmeldingerRoot from './_sykmeldinger-root'
import UnsentSykmeldinger from './_unsent-sykmeldinger'
import ProcessingSykmeldinger from './_processing-sykmeldinger'
import OlderSykmeldinger from './_older-sykmeldinger'

export const dynamic = 'force-dynamic'

async function SykmeldingerPage(): Promise<ReactElement> {
    return (
        <>
            <PageHeader title="Dine Sykmeldinger" />
            <Suspense fallback={<SykmeldingSkeleton />}>
                <ProcessingSykmeldinger />
            </Suspense>
            <Suspense fallback={<SykmeldingSkeleton count={2} />}>
                <UnsentSykmeldinger />
            </Suspense>
            <div className="my-8">
                <SykmeldingInfoAccordion />
            </div>
            <Suspense fallback={<SykmeldingSkeleton count={10} />}>
                <OlderSykmeldinger />
            </Suspense>
            {/*<Suspense fallback={<SykmeldingSkeleton />}>
                <SykmeldingList />
            </Suspense>*/}
        </>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

function SykmeldingSkeleton({ count = 1 }: { count?: number }): ReactElement {
    return (
        <div aria-label="Henter dine sykmeldinger" role="progressbar" aria-busy>
            <div className="mb-16 flex animate-pulse flex-col" aria-hidden>
                <div className="mb-2 h-8 w-18 rounded bg-gray-400"></div>
                <div className="flex flex-col gap-4">
                    {range(0, count).map((i) => (
                        <div key={i} className="h-32 w-full rounded bg-gray-400"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SykmeldingerPage
