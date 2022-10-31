import { onError } from '@apollo/client/link/error'
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { logger } from '@navikt/next-logger'

import { getPublicEnv } from '../utils/env'
import { getUserRequestId } from '../utils/userRequestId'

const publicEnv = getPublicEnv()

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            errorLink,
            new RetryLink({
                attempts: { max: 3 },
            }),
            httpLink,
        ]),
    })
}

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code !== 'UNAUTHENTICATED') {
                logger.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} for operation ${
                        operation.operationName
                    }, requestId: ${getUserRequestId()}`,
                )
            }
        })

    if (networkError) {
        if ('statusCode' in networkError) {
            if (networkError.statusCode === 401 || networkError.statusCode === 403) {
                // Redirect to allow SSR authentication to redirect to login
                window.location.reload()
                return
            }
        }

        networkError.message = `${networkError.message}. Happened in operation "${
            operation.operationName
        }" with variable id (if any): ${
            operation.variables.id ?? operation.variables.sykmeldingId
        }. User trace id: ${getUserRequestId()}`

        logger.error(networkError)
    }
})

const httpLink = new HttpLink({
    uri: `${publicEnv.publicPath ?? ''}/api/graphql`,
    credentials: 'same-origin',
    headers: {
        'x-request-id': getUserRequestId(),
    },
})
