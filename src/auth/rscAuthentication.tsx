import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateIdportenToken } from '@navikt/next-auth-wonderwall'
import { redirect } from 'next/navigation'

import { getServerEnv, isLocalOrDemo } from '../utils/env'

export async function verifyUserLoggedIn(): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const redirectPath = requestHeaders.get('x-path')
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }
    logger.info(`Redirect path is ${redirectPath}`)

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('Found no token, redirecting to login')
        redirect(`${getServerEnv().NEXT_PUBLIC_BASE_PATH ?? ''}/oauth2/login?redirect=${redirectPath}`)
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
        redirect(`${getServerEnv().NEXT_PUBLIC_BASE_PATH ?? ''}/oauth2/login?redirect=${redirectPath}`)
    }
}
