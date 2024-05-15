import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, GetServerSidePropsResult } from 'next'
import { logger } from '@navikt/next-logger'
import { validateToken, getToken, parseIdportenToken } from '@navikt/oasis'
import { IToggle } from '@unleash/nextjs'

import { browserEnv, isLocalOrDemo } from '../utils/env'
import { RequestContext } from '../server/graphql/resolvers'
import { getFlagsServerSide } from '../toggles/ssr'
import { getSessionId } from '../utils/userSessionId'

import { handleMockContext } from './mock-context'

export interface ServerSidePropsResult {
    toggles: IToggle[]
}

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> | unknown
type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ServerSidePropsResult>>

export const defaultPageHandler: PageHandler = async (context) => {
    const flags = await getFlagsServerSide(context.req, context.res)

    return {
        props: { toggles: flags.toggles },
    }
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler = defaultPageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        if (isLocalOrDemo) {
            return handleMockContext(context, handler)
        }

        const token = getToken(context.req)
        if (token == null) {
            return {
                redirect: { destination: `/oauth2/login?redirect=${getRedirectPath(context)}`, permanent: false },
            }
        }

        const validationResult = await validateToken(token)
        if (!validationResult.ok) {
            const error = new Error(
                `Invalid JWT token found (cause: ${validationResult.error.message}, redirecting to login.`,
                { cause: validationResult.error },
            )

            if (validationResult.errorType === 'token expired') {
                logger.warn(error)
            } else {
                logger.error(error)
            }

            return {
                redirect: { destination: `/oauth2/login?redirect=${getRedirectPath(context)}`, permanent: false },
            }
        }

        return handler(context)
    }
}

/**
 * Used to authenticate Next.JS pages.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res, ...rest) {
        if (isLocalOrDemo) {
            return handler(req, res, ...rest)
        }

        const token = getToken(req)
        if (token == null) {
            res.status(401).json({ message: 'Access denied' })
            return
        }

        const validatedToken = await validateToken(token)
        if (!validatedToken.ok) {
            logger.error(
                `Invalid JWT (${validatedToken.errorType}) token found (cause: ${validatedToken.error.message} for API ${req.url}`,
            )

            res.status(401).json({ message: 'Access denied' })
            return
        }

        return handler(req, res, ...rest)
    }
}

/**
 * When using rewrites, nextjs sometimes prepend the basepath for some reason. When redirecting to auth
 * we need a clean URL to redirect the user back to the same page we are on.
 */
function getRedirectPath(context: GetServerSidePropsContext): string {
    const basePath = browserEnv.NEXT_PUBLIC_BASE_PATH ?? ''
    const cleanUrl = context.resolvedUrl.replace(basePath, '')

    return cleanUrl.startsWith('/null')
        ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/`
        : `${browserEnv.NEXT_PUBLIC_BASE_PATH}${cleanUrl}`
}

/**
 * Creates the HTTP context that is passed through the resolvers and services, both for prefetching and HTTP-fetching.
 */
export function createRequestContext(req: GetServerSidePropsContext['req'] | NextApiRequest): RequestContext | null {
    const token = getToken(req)
    if (!token) {
        logger.warn('User is missing authorization bearer token')
        return null
    }

    const payload = parseIdportenToken(token)
    if (!payload.ok) {
        logger.error(`Failed to parse token: ${payload.error.message}`)
        return null
    }

    return {
        accessToken: token,
        pid: payload.pid,
        requestId: (req.headers['x-request-id'] as string) ?? 'not set',
        sessionId: 'unused',
    }
}

/**
 * Used locally or in demo environments to create a fake request context.
 */
export function createDemoRequestContext(req: GetServerSidePropsContext['req'] | NextApiRequest): RequestContext {
    if (!isLocalOrDemo) {
        throw new Error('createDemoRequestContext should only be used in local development or demo environments')
    }

    return {
        ...require('./fakeLocalAuthTokenSet.json'),
        requestId: 'not set',
        sessionId: getSessionId(req),
    }
}
