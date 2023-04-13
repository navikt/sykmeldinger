import { ApolloServer } from '@apollo/server'
import { logger } from '@navikt/next-logger'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'

import schema from '../../server/graphql/schema'
import { createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication'
import { RequestContext } from '../../server/graphql/resolvers'

const server = new ApolloServer<RequestContext>({
    schema,
    logger,
})

export default withAuthenticatedApi(
    startServerAndCreateNextHandler(server, {
        context: async (req) => {
            const resolverContextType = createRequestContext(
                req.headers['x-request-id'] as string | undefined,
                req.headers['authorization'],
            )

            if (!resolverContextType) {
                throw new GraphQLError('User not logged in', {
                    extensions: { code: 'UNAUTHENTICATED' },
                })
            }

            return resolverContextType
        },
    }),
)
