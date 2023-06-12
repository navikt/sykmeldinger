import React, { ReactElement, Suspense } from 'react'

import { PageHeader } from '../_shared/page-header'
import { rscApolloClient } from '../../_apollo'
import { SykmeldingByIdDocument } from '../../../fetching/graphql.generated'

import SykmeldingRoot from './_sykmelding-root'

function SykmeldingPage({ params }: { params: { sykmeldingId: string } }): ReactElement {
    return (
        <>
            <PageHeader title="Sykmelding" />
            <Suspense fallback={<SykmeldingSkeleton />}>
                <Sykmelding id={params.sykmeldingId} />
            </Suspense>
        </>
    )
}

function SykmeldingSkeleton(): ReactElement {
    return <div>Skelington</div>
}

async function Sykmelding({ id }: { id: string }): Promise<ReactElement> {
    const client = rscApolloClient()
    const sykmelding = await client.query({
        query: SykmeldingByIdDocument,
        variables: { id },
    })

    if (sykmelding.error) {
        return <div>En feil oppsto under lasting av sykmeldingen</div>
    }

    return (
        <SykmeldingRoot sykmelding={sykmelding.data.sykmelding}>
            {JSON.stringify(sykmelding.data.sykmelding)}
        </SykmeldingRoot>
    )
}

export default SykmeldingPage
