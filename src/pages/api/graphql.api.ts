import { ApolloServer } from '@apollo/server'
import { logger } from '@navikt/next-logger'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'

import schema from '../../server/graphql/schema'
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication'
import { RequestContext } from '../../server/graphql/resolvers'
import { bundledEnv, isLocalOrDemo } from '../../utils/env'

const server = new ApolloServer<RequestContext>({
    schema,
    logger,
    introspection: process.env.NODE_ENV === 'development' || bundledEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'dev',
})

export default withAuthenticatedApi(
    startServerAndCreateNextHandler(server, {
        context: async (req) => {
            if (isLocalOrDemo) {
                return createDemoRequestContext(req)
            }

            const resolverContextType = createRequestContext(req)

            if (!resolverContextType) {
                throw new GraphQLError('User not logged in', {
                    extensions: { code: 'UNAUTHENTICATED' },
                })
            }

            return resolverContextType
        },
    }),
)
