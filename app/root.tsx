import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { getDecoratorHTML } from '~/dekorator/dekorator.server'
import { json } from '@remix-run/node'
import parse from 'html-react-parser'

import globalStyles from './global.css'

export const links: LinksFunction = () => [
    ...(cssBundleHref
        ? [
              { rel: 'stylesheet', href: cssBundleHref },
              { rel: 'stylesheet', href: globalStyles },
          ]
        : []),
]

console.log(links());

export async function loader() {
    const fragments = await getDecoratorHTML()

    return json({
        fragments,
    })
}

export default function App() {
    const { fragments } = useLoaderData<typeof loader>()

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
                {parse(fragments.DECORATOR_STYLES, { trim: true })}
            </head>
            <body>
                {parse(fragments.DECORATOR_HEADER, { trim: true })}
                <Outlet />
                <ScrollRestoration />
                {parse(fragments.DECORATOR_FOOTER, { trim: true })}
                <Scripts />
                {parse(fragments.DECORATOR_SCRIPTS, { trim: true })}
                <LiveReload />
            </body>
        </html>
    )
}
