import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(
    http.get(
        'http://dekoratoren.personbruker/header',
        async () =>
            new HttpResponse(`
                <header>Imma header!</header>
            `),
    ),
    http.get(
        'http://dekoratoren.personbruker/footer',
        async () =>
            new HttpResponse(`
                <footer>Imma footer!</footer>
            `),
    ),
    http.get('http://dekoratoren.personbruker/metadata', async () =>
        HttpResponse.json({
            scripts: ['/fakerator/code.js'],
            styles: ['/fakerator/css.css'],
            inlineScripts: [`<script>console.log("u've been't hack'd")</script>`],
            language: 'nb',
        }),
    ),
)
