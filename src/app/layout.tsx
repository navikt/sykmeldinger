import '../style/global.css'

import React, { PropsWithChildren, ReactElement } from 'react'
import parse from 'html-react-parser'
import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import { Metadata } from 'next'

import { browserEnv, isE2E } from '../utils/env'
import { getToggles } from '../toggles/rsc'
import { createInitialServerSideBreadcrumbs, SsrPathVariants } from '../breadcrumbs/crumbs'

import PreloadResources from './preload-resources'
import Providers from './providers'

export const metadata: Metadata = {
    title: 'Sykmeldinger - www.nav.no',
}

async function Layout({ children }: PropsWithChildren): Promise<ReactElement> {
    const Decorator = await fetchDecoratorHtml({
        env: createDecoratorEnv(),
        params: {
            chatbot: true,
            context: 'privatperson',
            breadcrumbs: createInitialServerSideBreadcrumbs(SsrPathVariants.Root, {}),
        },
    })
    const flags = await getToggles()

    return (
        <html lang="no">
            <PreloadResources />
            <head>{parse(Decorator.DECORATOR_STYLES)}</head>
            <body>
                <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: Decorator.DECORATOR_HEADER }} />
                <Providers toggles={flags.toggles}></Providers>
                {children}
                <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: Decorator.DECORATOR_FOOTER }} />
                {parse(Decorator.DECORATOR_SCRIPTS, {
                    replace: (domNode) => {
                        if ('attribs' in domNode && domNode.attribs['fetchpriority'] != null) {
                            const value = domNode.attribs['fetchpriority']
                            delete domNode.attribs['fetchpriority']
                            domNode.attribs.fetchPriority = value
                        }

                        return undefined
                    },
                })}
            </body>
        </html>
    )
}

function E2ELayout({ children }: PropsWithChildren): ReactElement {
    return (
        <html lang="no">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

function createDecoratorEnv(): 'dev' | 'prod' {
    switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'local':
        case 'test':
        case 'dev':
            return 'dev'
        case 'demo':
        case 'production':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT}`)
    }
}

export default isE2E ? E2ELayout : Layout
