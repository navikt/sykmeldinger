import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/**/*.graphqls',
    documents: ['./src/**/*.graphql'],
    hooks: {
        afterOneFileWrite: ['prettier --write'],
    },
    generates: {
        './src/fetching/possible-types.generated.ts': {
            plugins: ['fragment-matcher'],
        },
        './src/fetching/graphql.generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typed-document-node',
                { add: { placement: 'prepend', content: '/* eslint-disable */' } },
            ],
            config: {
                immutableTypes: true,
                exportFragmentSpreadSubTypes: true,
                scalars: { Date: 'string', DateTime: 'string', JSON: 'unknown' },
                dedupeFragments: true,
                nonOptionalTypename: true,
                namingConvention: { enumValues: 'keep' },
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
                namingConvention: { enumValues: 'keep' },
            },
        },
    },
}

export default config
