import '../style/global.css'

import React, { PropsWithChildren, ReactElement } from 'react'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import { DecoratorBreadcrumb } from '@navikt/nav-dekoratoren-server-component/dist/common-types'
import { headers } from 'next/headers'

import { getServerEnv } from '../utils/env'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { getFlagsServerComponent } from '../toggles/rsc'
import { verifyUserLoggedIn } from '../auth/rscAuthentication'
import { createInitialServerSideBreadcrumbs, SsrPathVariants } from '../utils/breadcrumbs'

import Providers from './_providers'

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    await verifyUserLoggedIn()

    const toggles = await getFlagsServerComponent(headers())

    return (
        <html lang="en">
            <Decorator decoratorProps={{ env: createDecoratorEnv(), params: { breadcrumbs: createBreadcrumbs() } }}>
                <LabsWarning />
                <main id="maincontent" role="main" tabIndex={-1}>
                    <Providers toggles={toggles}>{children}</Providers>
                </main>
            </Decorator>
        </html>
    )
}

function createDecoratorEnv(): 'dev' | 'prod' {
    switch (getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'test':
        case 'dev':
            return 'dev'
        case 'local':
        case 'demo':
        case 'production':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT}`)
    }
}

function createBreadcrumbs(): DecoratorBreadcrumb[] {
    const path = headers()
        .get('x-path')
        ?.replace(getServerEnv().NEXT_PUBLIC_BASE_PATH ?? '', '')

    return createInitialServerSideBreadcrumbs(pathToVariant(path), {}, true)
}

function pathToVariant(path: string | undefined): SsrPathVariants | 'unknown' {
    if (!path) return 'unknown'

    if (path === '/new') return SsrPathVariants.Root
    else if (path.startsWith('/new/')) return SsrPathVariants.Sykmelding

    return 'unknown'
}
