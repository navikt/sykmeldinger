import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { NextApiRequest } from 'next';

import schema from '../../server/graphql/schema';
import { createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication';
import { logger } from '../../utils/logger';
import { RequestContext } from '../../server/graphql/resolvers';

const apolloServer = new ApolloServer({
    schema,
    formatError: (error) => {
        if (error.extensions?.code !== 'UNAUTHENTICATED') {
            logger.error(error);
        }

        return error;
    },
    formatResponse: (response, context) => {
        if (response.errors?.some((it) => it.extensions?.code === 'UNAUTHENTICATED')) {
            if (context.response?.http) {
                context.response.http.status = 401;
            }
        }
        return response;
    },
    context: async ({ req }: { req: NextApiRequest }): Promise<RequestContext> => {
        const resolverContextType = createRequestContext(req);

        if (!resolverContextType) {
            throw new AuthenticationError('User not logged in');
        }

        return resolverContextType;
    },
    plugins: [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    cache: 'bounded',
    logger,
});

export const config = {
    api: { bodyParser: false },
};

const startServer = apolloServer.start();
export default withAuthenticatedApi(async (req, res) => {
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
});
