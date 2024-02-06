import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { logger } from '@navikt/next-logger'
import { sha256 } from 'crypto-hash'
import { QueryOptions } from '@apollo/client/core/watchQueryOptions'
import { OperationVariables } from '@apollo/client/core/types'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { browserEnv } from '../utils/env'
import { getUserRequestId } from '../utils/userRequestId'

import possibleTypesGenerated from './possible-types.generated'

export const createInMemoryCache = (): InMemoryCache =>
    new InMemoryCache({
        dataIdFromObject: () => false,
        typePolicies: {
            Sykmelding: { keyFields: ['id'] },
            MinimalSykmelding: { keyFields: ['sykmelding_id'] },
            Brukerinformasjon: { keyFields: () => 'brukerinformasjon' },
        },
        possibleTypes: possibleTypesGenerated.possibleTypes,
    })

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        connectToDevTools:
            process.env.NODE_ENV === 'development' || browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev',
        cache: createInMemoryCache(),
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

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        // This is temporary debugging. Backend has a bunch of weird 404's that shouldn't happen.
        if (graphQLErrors.some((it) => it.message.includes('404 Not Found'))) {
            logger.error('Backend responded with 404, retrying once...')
            return forward(operation)
        }

        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code !== 'UNAUTHENTICATED') {
                logger.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} for operation ${
                        operation.operationName
                    }, requestId: ${getUserRequestId()}`,
                )
            }
        })
    }

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

    return
})

const httpLink = new HttpLink({
    uri: `${browserEnv.NEXT_PUBLIC_BASE_PATH ?? ''}/api/graphql`,
    credentials: 'same-origin',
    headers: {
        'x-request-id': getUserRequestId(),
    },
})

export const typedRefetchQuery = <TVariables = OperationVariables>(
    queryOptions: QueryOptions<TVariables> & {
        query: TypedDocumentNode<unknown, TVariables>
    },
): QueryOptions<TVariables> => queryOptions
