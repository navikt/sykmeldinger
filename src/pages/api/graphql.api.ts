import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { NextApiRequest } from 'next';

import schema from '../../server/graphql/schema';
import { withAuthenticatedApi } from '../../auth/withAuthentication';
import { logger } from '../../utils/logger';
import { ResolverContextType } from '../../server/graphql/resolvers';
import { isLocalOrDemo } from '../../utils/env';

const apolloServer = new ApolloServer({
    schema,
    formatError: (error) => {
        logger.error(error);
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
    context: async ({ req }: { req: NextApiRequest }): Promise<ResolverContextType> => {
        if (isLocalOrDemo) return { selvbetjeningsToken: 'fake-local-auth-token' };

        const selvbetjeningsCookie = req.cookies['selvbetjening-idtoken'];

        if (!selvbetjeningsCookie) {
            throw new AuthenticationError('User not logged in');
        }

        return { selvbetjeningsToken: selvbetjeningsCookie };
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
