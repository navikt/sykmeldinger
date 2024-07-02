import React, { PropsWithChildren, ReactElement } from 'react'
import parse from 'html-react-parser'
import Script from 'next/script'

import { getBlocks, getMetadata } from './fetch'

async function Decorator({ children }: PropsWithChildren): Promise<ReactElement> {
    const { scripts, links, inlineScripts, language } = await getMetadata()
    const { header, footer } = await getBlocks()

    return (
        <html lang={language ?? 'nb'}>
            <head>
                {links.map((it) => (
                    <link key={it.href} rel={it.rel} type={it.type} href={it.href} />
                ))}
            </head>
            <body>
                {parse(header)}
                {children}
                {parse(footer)}
                {inlineScripts.map((it) => (
                    <div key={it} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
                {scripts.map(({ src, ...rest }) => (
                    <Script key={src} src={src} {...rest} />
                ))}
            </body>
        </html>
    )
}

export default Decorator
