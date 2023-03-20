import { getPublicEnv } from '../../../utils/env'

const publicEnv = getPublicEnv()

export const dynamic = 'force-dynamic'

export function GET(): Response {
    return new Response(`
        window._publicEnv = ${JSON.stringify(publicEnv)}
    `)
}
