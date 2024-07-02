import { DecoratorElements, fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'

let cachedHtml: DecoratorElements | null = null
export async function decoratorProxy(): Promise<DecoratorElements> {
    if (cachedHtml) {
        return cachedHtml
    }

    const html = await fetchDecoratorHtml({
        env: 'prod',
        params: {
            language: 'nb',
            breadcrumbs: [
                {
                    url: 'https://nav.no',
                    title: 'Test test test',
                },
                {
                    url: 'https://nav.no',
                    title: 'Test test test',
                },
            ],
        },
    })

    cachedHtml = html

    return html
}
