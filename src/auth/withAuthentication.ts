import { IncomingMessage } from 'http'

import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, GetServerSidePropsResult } from 'next'
import { logger } from '@navikt/next-logger'
import { validateIdportenToken } from '@navikt/next-auth-wonderwall'

import { getPublicEnv, isLocalOrDemo } from '../utils/env'
import { RequestContext } from '../server/graphql/resolvers'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<unknown>
type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<unknown>>

const publicEnv = getPublicEnv()

export interface TokenPayload {
    sub: string
    iss: string
    client_amr: string
    pid: string
    token_type: string
    client_id: string
    acr: string
    scope: string
    exp: string
    iat: string
    client_orgno: string
    jti: string
    consumer: {
        authority: string
        ID: string
    }
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler = async () => ({ props: {} })) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        if (isLocalOrDemo) {
            return handler(context)
        }

        const request = context.req

        const bearerToken: string | null | undefined = request.headers['authorization']
        if (!bearerToken) {
            return {
                redirect: { destination: `/oauth2/login?redirect=${getRedirectPath(context)}`, permanent: false },
            }
        }

        const validationResult = await validateIdportenToken(bearerToken)
        if (validationResult !== 'valid') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
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

        const bearerToken: string | null | undefined = req.headers['authorization']
        const validatedToken = bearerToken ? await validateIdportenToken(bearerToken) : null
        if (!bearerToken || validatedToken !== 'valid') {
            if (validatedToken && validatedToken !== 'valid') {
                logger.error(`Invalid JWT token found (cause: ${validatedToken.message} for API ${req.url}`)
            }

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
    const basePath = publicEnv.publicPath ?? ''
    const cleanUrl = context.resolvedUrl.replace(basePath, '')

    return cleanUrl.startsWith('/null') ? `${publicEnv.publicPath}/` : `${publicEnv.publicPath}${cleanUrl}`
}

/**
 * Creates the HTTP context that is passed through the resolvers and services, both for prefetching and HTTP-fetching.
 */
export function createRequestContext(req: IncomingMessage): RequestContext | null {
    const requestId = req.headers['x-request-id'] as string | undefined

    if (isLocalOrDemo) {
        return { ...require('./fakeLocalAuthTokenSet.json'), requestId: requestId ?? 'not set' }
    }

    const token = req.headers['authorization']
    if (!token) {
        logger.warn('User is missing authorization bearer token')
        return null
    }

    const accessToken = token.replace('Bearer ', '')
    const jwtPayload = accessToken.split('.')[1]
    return {
        accessToken,
        payload: JSON.parse(Buffer.from(jwtPayload, 'base64').toString()),
        requestId: requestId ?? 'not set',
    }
}
