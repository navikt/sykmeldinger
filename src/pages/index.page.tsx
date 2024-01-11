import React, { ReactElement } from 'react'
import Head from 'next/head'

import { withAuthenticatedPage } from '../auth/withAuthentication'
import Header from '../components/Header/Header'
import SykmeldingerListAll from '../components/SykmeldingerList/SykmeldingerListAll'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'

function SykmeldingerPage(): ReactElement {
    useUpdateBreadcrumbs(() => [])

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Sykmeldinger" />
            <PageWrapper>
                <SykmeldingerListAll />
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
