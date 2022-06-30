import { onError } from '@apollo/client/link/error';
import { ApolloClient, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

import { logger } from '../utils/logger';
import { getPublicEnv, isLocalOrDemo } from '../utils/env';

const publicEnv = getPublicEnv();
const loginServiceUrl = `${publicEnv.LOGIN_SERVICE_URL}?redirect=${publicEnv.LOGIN_SERVICE_REDIRECT_URL}`;

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
            logger.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });

    if (networkError) {
        if ('statusCode' in networkError) {
            if (networkError.statusCode === 401 || networkError.statusCode === 403) {
                if (isLocalOrDemo) return;

                window.location.href = loginServiceUrl;
                logger.warn(`Session expired for request(s) ${graphQLErrors?.map((it) => it.path)}`);
                return;
            }
        }

        logger.error(`[Network error]: ${networkError}`);
    }
});

const httpLink = new HttpLink({
    uri: `${publicEnv.publicPath ?? ''}/api/graphql`,
});
