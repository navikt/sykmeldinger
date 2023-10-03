// This is imported to allow the Output File Tracing feature of Next.js to work correctly with the log patcher
import 'next-logger'

import { ReactElement } from 'react'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import { DecoratorComponents, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

import { browserEnv } from '../utils/env'
import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string): string => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

function createDecoratorEnv(ctx: DocumentContext): 'dev' | 'prod' {
    if (ctx.pathname === '/500' || ctx.pathname === '/404' || process.env.NODE_ENV === 'development') {
        // Blir statisk kompilert i GHA så må hentes defra
        return 'prod'
    }

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

interface Props {
    Decorator: DecoratorComponents | null
    language: string | null
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        if (process.env.NEXT_PUBLIC_IS_E2E === 'true') {
            return {
                ...initialProps,
                Decorator: null,
                language: null,
            }
        }

        const Decorator = await fetchDecoratorReact({
            env: createDecoratorEnv(ctx),
            params: {
                chatbot: true,
                context: 'privatperson',
                breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname, ctx.query),
            },
        })

        const language = getDocumentParameter(initialProps, 'lang')

        return { ...initialProps, Decorator, language }
    }

    render(): ReactElement {
        const { Decorator, language } = this.props

        if (!Decorator) {
            // Used for e2e tests
            return (
                <Html lang={language || 'no'}>
                    <Head />
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Html>
            )
        }

        return (
            <Html lang={language || 'no'}>
                <Head>
                    <Decorator.Styles />
                    <link
                        rel="preload"
                        href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Decorator.Header />
                    <Main />
                    <Decorator.Footer />
                    <Decorator.Scripts />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
