import '../style/global.css'

import React, { PropsWithChildren, ReactElement } from 'react'
import { Decorator } from '@navikt/nav-dekoratoren-server-component'
import { DecoratorBreadcrumb } from '@navikt/nav-dekoratoren-server-component/dist/common-types'
import { headers } from 'next/headers'

import { browserEnv } from '../utils/env'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { getFlagsServerComponent } from '../toggles/rsc'
import { verifyUserLoggedIn } from '../auth/rscAuthentication'
import { createInitialServerSideBreadcrumbs, SsrPathVariants } from '../utils/breadcrumbs'

import Providers from './_providers'

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    await verifyUserLoggedIn()

    const toggles = await getFlagsServerComponent()

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
    switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'test':
        case 'dev':
            return 'dev'
        case 'local':
        case 'demo':
        case 'production':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT}`)
    }
}

function createBreadcrumbs(): DecoratorBreadcrumb[] {
    const path = headers().get('x-path')

    if (path === '/new') return createInitialServerSideBreadcrumbs(SsrPathVariants.Root, {})

    throw new Error(`Unknown path: ${path}`)
}
