import React, { ReactElement, Suspense } from 'react'
import { range } from 'remeda'

import { SykmeldingInfoAccordion } from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'

import { PageHeader } from './_shared/page-header'
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
        </>
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
