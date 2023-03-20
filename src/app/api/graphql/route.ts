import { logger } from '@navikt/next-logger'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'

import schema from '../../../server/graphql/schema'
import { RequestContext } from '../../../server/graphql/resolvers'

const server = new ApolloServer<RequestContext>({
    schema,
    logger,
})

const handler = startServerAndCreateNextHandler(server)

export async function POST(request: Request): Promise<Response> {
    return handler(request)
}
