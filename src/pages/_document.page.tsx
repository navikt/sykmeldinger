import React from 'react'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import { Components, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

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
    }
}

interface Props {
    Decorator: Components
    language: string
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const Decorator = await fetchDecoratorReact({
            env: createDecoratorEnv(ctx),
            chatbot: true,
            context: 'privatperson',
            breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname, ctx.query),
        })

        const language = getDocumentParameter(initialProps, 'lang')

        return { ...initialProps, Decorator, language }
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props

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
