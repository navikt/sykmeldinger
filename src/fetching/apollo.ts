import { onError } from '@apollo/client/link/error';
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

import { logger } from '../utils/logger';
import { getPublicEnv } from '../utils/env';

const publicEnv = getPublicEnv();

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        uri: `${publicEnv.publicPath ?? ''}/api/graphql`,
        headers: {
            credentials: 'include',
        },
        cache: new InMemoryCache(),
        link: from([
            errorLink,
            new RetryLink({
                attempts: { max: 3 },
            }),
            httpLink,
        ]),
    });
};

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.code !== 'UNAUTHENTICATED') {
                logger.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} for operation ${operation.operationName}`,
                );
            }
        });

    if (networkError) {
        if ('statusCode' in networkError) {
            if (networkError.statusCode === 401 || networkError.statusCode === 403) {
                // Redirect to allow SSR authentication to redirect to login
                window.location.reload();
                return;
            }
        }

        logger.error(`[Network error]: ${networkError} for operation ${operation.operationName}`);
    }
});

const httpLink = new HttpLink({
    uri: `${publicEnv.publicPath ?? ''}/api/graphql`,
});
