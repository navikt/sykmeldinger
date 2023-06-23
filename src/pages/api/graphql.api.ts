import { ApolloServer } from '@apollo/server'
import { logger } from '@navikt/next-logger'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'

import schema from '../../server/graphql/schema'
import { createRequestContext, withAuthenticatedApi } from '../../auth/withAuthentication'
import { RequestContext } from '../../server/graphql/resolvers'
import { getSessionId } from '../../utils/userSessionId'

const server = new ApolloServer<RequestContext>({
    schema,
    logger,
})

export default withAuthenticatedApi(
    startServerAndCreateNextHandler(server, {
        context: async (req) => {
            const sessionId = getSessionId(req)
            const resolverContextType = createRequestContext(
                req.headers['x-request-id'] as string | undefined,
                req.headers['authorization'],
                sessionId,
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
