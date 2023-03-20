import React from 'react'
import { SykmeldingByIdDocument, SykmeldingerDocument } from '../../fetching/graphql.generated'
import LoadingError from '../../components-new/page-loading/LoadingError'
import { createSsrApolloClient } from '../page'
import Header from '../../components/Header/Header'
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../utils/sykmeldingUtils'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden'
import ClientSykmelding from '../../components-new/sykmelding/ClientSykmelding'

interface PageProps {
    params: { sykmeldingId: string }
}

async function Page({ params }: PageProps): Promise<JSX.Element> {
    const client = createSsrApolloClient()
    const sykmelding = await client.query({ query: SykmeldingByIdDocument, variables: { id: params.sykmeldingId } })

    if (sykmelding.error) {
        return <LoadingError message={sykmelding.error.message} />
    }

    return (
        <div className="print:hidden">
            <head>
                <title>Sykmelding - www.nav.no</title>
            </head>
            <Header
                title={sykmelding ? getSykmeldingTitle(sykmelding.data.sykmelding) : undefined}
                subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding.data.sykmelding) : undefined}
            />
            <PageWrapper>
                <ClientSykmelding
                    sykmelding={sykmelding.data.sykmelding}
                    olderSykmeldingId={null}
                    olderSykmeldingCount={0}
                />
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </div>
    )
}

export default Page
