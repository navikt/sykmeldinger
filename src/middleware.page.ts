import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getFlag } from './toggles/toggles'
import { getFlagsServerComponent } from './toggles/rsc'

/**
 * This middleware is purely a hack to be able to provide the react server component auth
 * with the current path. This is needed to be able to redirect to the correct page after
 * login.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
    const requestUrl = new URL(request.url)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-path', requestUrl.pathname)

    const toggles = await getFlagsServerComponent(requestHeaders)
    if (!getFlag('SYKMELDINGER_NEW_ROUTES', toggles).enabled) {
        return NextResponse.rewrite(`${requestUrl.origin}/404`)
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: ['/new', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
