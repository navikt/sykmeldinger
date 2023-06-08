import React, { PropsWithChildren, ReactElement } from 'react'
import { Metadata } from 'next'

import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden'

export const metadata: Metadata = {
    title: 'Sykmeldinger - www.nav.no',
}

function SykmeldingerLayout({ children }: PropsWithChildren): ReactElement {
    return (
        <div className="mx-auto max-w-2xl p-4 pb-32">
            {children}
            <div className="mt-16">
                <TilHovedsiden />
            </div>
        </div>
    )
}

export default SykmeldingerLayout
