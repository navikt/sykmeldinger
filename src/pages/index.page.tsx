import React, { ReactElement } from 'react'
import Head from 'next/head'

import useHotjarTrigger from '../hooks/useHotjarTrigger'
import { withAuthenticatedPage } from '../auth/withAuthentication'
import Header from '../components/Header/Header'
import SykmeldingerListAll from '../components/SykmeldingerList/SykmeldingerListAll'
import { useFlag } from '../toggles/context'
import SykmeldingerListDynamic from '../components/SykmeldingerList/SykmeldingerListDynamic'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'

function SykmeldingerPage(): ReactElement {
    useHotjarTrigger('SYKMELDING_LISTEVISNING')
    useUpdateBreadcrumbs(() => [])

    const newListView = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                {newListView.enabled ? <SykmeldingerListDynamic /> : <SykmeldingerListAll />}
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
