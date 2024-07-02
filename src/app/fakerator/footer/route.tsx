import { decoratorProxy } from '../proxy'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
    const parts = await decoratorProxy()

    return new Response(parts.DECORATOR_FOOTER)
}
