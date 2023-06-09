import path from 'path'
import fs from 'fs'

import { ApolloClient, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { logger } from '@navikt/next-logger'

import possibleTypesGenerated from '../fetching/possible-types.generated'
import { isLocalOrDemo } from '../utils/env'
import mockResolvers from '../server/graphql/mockResolvers'
import resolvers from '../server/graphql/resolvers'
import { getUserContext } from '../auth/rscAuthentication'

export function rscApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        connectToDevTools: false,
        cache: new InMemoryCache({
            possibleTypes: possibleTypesGenerated.possibleTypes,
        }),
        link: from([new SchemaLink({ schema: loadSchema(), context: () => getUserContext() })]),
    })
}

function loadSchema(): GraphQLSchema {
    const schemaDir = path.join(process.cwd(), 'src/server/graphql/typedef')
    const typeDefs = loadSchemaFiles(schemaDir)

    return makeExecutableSchema({
        typeDefs,
        resolvers: isLocalOrDemo ? mockResolvers : resolvers,
    })
}

let loadedSchema: string | null = null
function loadSchemaFiles(dirPath: string): string {
    if (loadedSchema) {
        return loadedSchema
    }

    logger.info(`Loading schema files from ${dirPath}`)
    const files = fs.readdirSync(dirPath)
    const schemaFiles = files.filter((file) => file.endsWith('.graphqls'))
    const schema = schemaFiles.map((file) => {
        const filePath = path.join(dirPath, file)
        return fs.readFileSync(filePath, 'utf-8')
    })

    loadedSchema = schema.join('\n')
    return loadedSchema
}
