import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'
import { validateToken, getToken, parseIdportenToken } from '@navikt/oasis'
import { IToggle } from '@unleash/nextjs'

import { isLocalOrDemo } from '../utils/env'
import { RequestContext } from '../server/graphql/resolvers'
import { getSessionId } from '../utils/userSessionId'

export interface ServerSidePropsResult {
    toggles: IToggle[]
}

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> | unknown

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
