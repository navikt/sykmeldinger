import { logger } from '@navikt/next-logger'

import { RequestContext } from '../server/graphql/resolvers'
import { isLocalOrDemo } from '../utils/env'

/**
 * Creates the HTTP context that is passed through the resolvers and services, both for prefetching and HTTP-fetching.
 */
export function getUserContext(headers: Headers): RequestContext | null {
    if (isLocalOrDemo) {
        return {
            ...require('./fakeLocalAuthTokenSet.json'),
            requestId: 'not set',
            sessionId: 'not set',
        }
    }

    const token = headers.get('authorization')
    if (!token) {
        logger.warn('User is missing authorization bearer token')
        return null
    }

    const accessToken = token.replace('Bearer ', '')
    const jwtPayload = accessToken.split('.')[1]
    return {
        accessToken,
        payload: JSON.parse(Buffer.from(jwtPayload, 'base64').toString()),
        requestId: headers.get('x-request-id') ?? 'not set',
        sessionId: 'unused',
    }
}
