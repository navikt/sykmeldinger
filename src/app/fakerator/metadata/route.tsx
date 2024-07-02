import * as R from 'remeda'
import { HttpResponse } from 'msw'
import jsdom from 'jsdom'

import { decoratorProxy } from '../proxy'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
    const datas = await decoratorProxy()

    const linksDom = new jsdom.JSDOM(datas.DECORATOR_STYLES)
    const links = linksDom.window.document.getElementsByTagName('link')

    const linkAttributes = Array.from(links).map((link) => ({
        href: link.getAttribute('href'),
        rel: link.getAttribute('rel'),
        type: link.getAttribute('type'),
    }))

    const jsdomScripts = new jsdom.JSDOM(datas.DECORATOR_SCRIPTS)
    const scriptNodes = jsdomScripts.window.document.getElementsByTagName('script')

    const [inlineScripts, scriptsTags] = R.pipe(
        Array.from(scriptNodes),
        R.map((script) => {
            if (script.src) {
                const attributes: Record<string, string | number> = {}
                Array.from(script.attributes).forEach((attr) => {
                    attributes[attr.name] = attr.value
                })
                return { src: script.src, ...attributes }
            } else {
                return script.outerHTML
            }
        }),
        R.partition((script) => typeof script === 'string'),
    )

    return HttpResponse.json({
        links: linkAttributes,
        scripts: scriptsTags,
        inlineScripts: inlineScripts,
        language: 'nb',
    })
}
