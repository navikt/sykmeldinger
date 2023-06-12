'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'

function SykmeldingerRoot({ children }: PropsWithChildren): ReactElement {
    useUpdateBreadcrumbs(() => [], [], true)

    return <div>{children}</div>
}

export default SykmeldingerRoot
