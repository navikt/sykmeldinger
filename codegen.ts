import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/**/*.graphqls',
    documents: './src/**/*.graphql',
    hooks: {
        afterOneFileWrite: ['prettier --write'],
    },
    generates: {
        './src/fetching/graphql.generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                immutableTypes: true,
                exportFragmentSpreadSubTypes: true,
                scalars: { Date: 'string', DateTime: 'string', JSON: 'unknown' },
                dedupeFragments: true,
                nonOptionalTypename: true,
            },
        },
        './src/server/graphql/resolver-types.generated.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                { add: { placement: 'prepend', content: '/* eslint-disable */' } },
            ],
            config: {
                useIndexSignature: true,
                contextType: './resolvers#RequestContext',
                avoidOptionals: {
                    field: true,
                },
                scalars: { Date: 'string', DateTime: 'string', JSON: 'unknown' },
            },
        },
    },
}

export default config
