import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { logger } from '@navikt/next-logger'
import { sha256 } from 'crypto-hash'

import { browserEnv } from '../utils/env'
import { getUserRequestId } from '../utils/userRequestId'

import possibleTypesGenerated from './possible-types.generated'

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        connectToDevTools: process.env.NODE_ENV === 'development',
        cache: new InMemoryCache({
            possibleTypes: possibleTypesGenerated.possibleTypes,
        }),
        link: from([
            errorLink,
            new RetryLink({
                attempts: { max: 3 },
            }),
            persistedQueriesLink.concat(httpLink),
        ]),
    })
}

const persistedQueriesLink = createPersistedQueryLink({ sha256 })

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

        const networkMessage = 'statusCode' in networkError ? `Status: ${networkError.statusCode}` : 'No status code'
        const operationDetails = `Happened in operation "${operation.operationName}" with variable id (if any): ${
            operation.variables.id ?? operation.variables.sykmeldingId
        }`
        const traceDetails = `User trace id: ${getUserRequestId()}`

        networkError.message = `${networkError.message}. ${networkMessage}. \n\n${operationDetails}. \n\n${traceDetails}`
        logger.error(networkError)
    }
})

const httpLink = new HttpLink({
    uri: `${browserEnv.NEXT_PUBLIC_BASE_PATH ?? ''}/api/graphql`,
    credentials: 'same-origin',
    headers: {
        'x-request-id': getUserRequestId(),
    },
})
