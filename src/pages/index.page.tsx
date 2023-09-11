import React, { ReactElement } from 'react'
import Head from 'next/head'

import useHotjarTrigger from '../hooks/useHotjarTrigger'
import { ServerSidePropsResult, withAuthenticatedPage } from '../auth/withAuthentication'
import Header from '../components/Header/Header'
import SykmeldingerListAll from '../components/SykmeldingerList/SykmeldingerListAll'
import { useFlag } from '../toggles/context'
import SykmeldingerListDynamic from '../components/SykmeldingerList/SykmeldingerListDynamic'

function SykmeldingerPage({}: ServerSidePropsResult): ReactElement {
    useHotjarTrigger('SYKMELDING_LISTEVISNING')

    const newListView = useFlag('SYKMELDINGER_LIST_VIEW_DATA_FETCHING')

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            {newListView.enabled ? <SykmeldingerListDynamic /> : <SykmeldingerListAll />}
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
