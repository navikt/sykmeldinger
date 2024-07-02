export async function getMetadata(): Promise<{
    language: string
    scripts: ({ src: string } & Record<string, string | number>)[]
    inlineScripts: string[]
    links: { type: string; rel: string; href: string }[]
}> {
    const result = await fetch('http://localhost:3000/fakerator/metadata')

    return result.json()
}

export async function getBlocks(): Promise<{ header: string; footer: string }> {
    return {
        header: await fetch('http://localhost:3000/fakerator/header').then((it) => it.text()),
        footer: await fetch('http://localhost:3000/fakerator/footer').then((it) => it.text()),
    }
}
