import React, { PropsWithChildren, ReactElement } from 'react'
import parse from 'html-react-parser'
import Script from 'next/script'

import { getBlocks, getMetadata } from './fetch'

async function Decorator({ children }: PropsWithChildren): Promise<ReactElement> {
    const { scripts, styles, inlineScripts, language } = await getMetadata()
    const { header, footer } = await getBlocks()

    return (
        <html lang={language ?? 'nb'}>
            <head>
                {styles.map((it) => (
                    <link key={it} rel="stylesheet" href={it} />
                ))}
            </head>
            <body>
                {parse(header)}
                {children}
                {parse(footer)}
                {inlineScripts.map((it) => (
                    <div key={it} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
                {scripts.map((it) => (
                    <Script key={it} src={it} />
                ))}
            </body>
        </html>
    )
}

export default Decorator
