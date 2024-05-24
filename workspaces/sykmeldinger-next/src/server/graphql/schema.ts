import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

import { isLocalOrDemo } from '../../utils/env'

import resolvers from './resolvers'
import mockResolvers from './mockResolvers'

const typeDefs = loadSchemaSync('**/*.graphqls', {
    loaders: [new GraphQLFileLoader()],
})

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: isLocalOrDemo ? mockResolvers : resolvers,
})

export default schema
