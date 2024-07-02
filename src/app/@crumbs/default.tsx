'use client'

import React, { ReactElement } from 'react'
import { useParams, usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'

import Breadcrumbr from '../fakerator/breadcrumbr'

function Default(): ReactElement {
    const segments = useSelectedLayoutSegments()
    const segment = useSelectedLayoutSegment()
    const query = useParams()
    const pathname = usePathname()

    return (
        <div>
            <Breadcrumbr more={!pathname?.includes('kvitt')} />
            <div>{JSON.stringify(segments, null, 2)}</div>
            <div>{JSON.stringify(query, null, 2)}</div>
            <div>{JSON.stringify(pathname, null, 2)}</div>
            <div>{JSON.stringify(segment, null, 2)}</div>
            <div>I am crumbs → ooo → weee → aaah</div>
        </div>
    )
}

export default Default
