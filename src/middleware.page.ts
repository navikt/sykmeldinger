import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * This middleware is purely a hack to be able to provide the react server component auth
 * with the current path. This is needed to be able to redirect to the correct page after
 * login.
 */
export function middleware(request: NextRequest): NextResponse {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-path', new URL(request.url).pathname)

    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: ['/new', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
