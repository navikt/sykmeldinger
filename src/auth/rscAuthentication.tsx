import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateIdportenToken } from '@navikt/next-auth-wonderwall'
import { redirect } from 'next/navigation'

import { RequestContext } from '../server/graphql/resolvers'
import { isLocalOrDemo } from '../utils/env'

export async function verifyUserLoggedIn(): Promise<void> {
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const redirectPath = requestHeaders.get('x-path')
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateIdportenToken(bearerToken)
    if (validationResult !== 'valid') {
        const error = new Error(
            `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
            { cause: validationResult.error },
        )
        if (validationResult.errorType === 'NOT_ACR_LEVEL4') {
            logger.warn(error)
        } else {
            logger.error(error)
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}

/**
 * Creates the HTTP context that is passed through the resolvers and services, both for prefetching and HTTP-fetching.
 */
export function getUserContext(): RequestContext | null {
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        return { ...require('./fakeLocalAuthTokenSet.json') }
    }

    const token = requestHeaders.get('authorization')
    if (!token) {
        logger.warn('User is missing authorization bearer token')
        return null
    }

    const accessToken = token.replace('Bearer ', '')
    const jwtPayload = accessToken.split('.')[1]
    return {
        accessToken,
        payload: JSON.parse(Buffer.from(jwtPayload, 'base64').toString()),
        requestId: requestHeaders.get('x-request-id') ?? 'not set',
    }
}
