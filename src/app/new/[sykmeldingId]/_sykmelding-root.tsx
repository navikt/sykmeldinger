'use client'

import React, { PropsWithChildren, ReactElement, useEffect } from 'react'

import { SykmeldingFragment } from '../../../fetching/graphql.generated'
import { useUpdateBreadcrumbs } from '../../../hooks/useBreadcrumbs'
import { browserEnv } from '../../../utils/env'
import { createSykmeldingBreadcrumbs } from '../../../utils/breadcrumbs'

function SykmeldingRoot({ children, sykmelding }: PropsWithChildren<{ sykmelding: SykmeldingFragment }>): ReactElement {
    useUpdateBreadcrumbs(() => createSykmeldingBreadcrumbs(sykmelding), [sykmelding], true)

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p' && sykmelding?.id) {
                e.preventDefault()
                e.stopImmediatePropagation()
                window.open(`${browserEnv.NEXT_PUBLIC_BASE_PATH}/${sykmelding.id}/pdf`, '_ blank')
            }
        })
    }, [sykmelding.id])

    return <div>{children}</div>
}

export default SykmeldingRoot
