import { GraphQLJSON } from 'graphql-scalars'

import { MutationResolvers, QueryResolvers, Resolvers } from './resolver-types.generated'
import mockDb from './mockDb'

const Query: QueryResolvers = {
    sykmeldinger: async (_, _args, { user }) => mockDb().getSykmeldinger(user),
    sykmelding: async (_, { id }, { user }) => mockDb().getSykmelding(id, user),
    brukerinformasjon: async (_, _args, { user }) => mockDb().getBrukerinformasjon(user),
    sykmeldingUtenforVentetid: async () => ({ erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' }),
}

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }, { user }) =>
        mockDb().changeSykmeldingStatus(sykmeldingId, status, user),
    submitSykmelding: async (_, { sykmeldingId }, { user }) => mockDb().submitSykmelding(sykmeldingId, user),
}

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
}

export default resolvers
