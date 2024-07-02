export async function getMetadata(): Promise<{
    language: string
    scripts: string[]
    inlineScripts: string[]
    styles: string[]
}> {
    const result = await fetch('http://dekoratoren.personbruker/metadata')

    return result.json()
}

export async function getBlocks(): Promise<{ header: string; footer: string }> {
    return {
        header: await fetch('http://dekoratoren.personbruker/header').then((it) => it.text()),
        footer: await fetch('http://dekoratoren.personbruker/footer').then((it) => it.text()),
    }
}
