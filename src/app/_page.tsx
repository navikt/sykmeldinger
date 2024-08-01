'use client'

import React, { ReactElement } from 'react'

import Header from '../components/Header/Header'
import SykmeldingerListAll from '../components/SykmeldingerList/SykmeldingerListAll'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { useUpdateBreadcrumbs } from '../breadcrumbs/useBreadcrumbs'

function SykmeldingerPage(): ReactElement {
    useUpdateBreadcrumbs(() => [])

    return (
        <>
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

export default SykmeldingerPage
