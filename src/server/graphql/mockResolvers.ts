import { GraphQLJSON } from 'graphql-scalars'

import { MutationResolvers, QueryResolvers, Resolvers, Sykmelding } from './resolver-types.generated'
import objectResolvers from './objectResolvers'
import { Scenarios } from './mock-db/scenarios'
import mockDb from './mock-db'

const Query: QueryResolvers = {
    sykmeldinger: async (_, args, { sessionId }): Promise<Sykmelding[]> => mockDb().get(sessionId).sykmeldinger(),
    sykmelding: async (_, { id }, { sessionId }): Promise<Sykmelding> => mockDb().get(sessionId).sykmelding(id),
    brukerinformasjon: async (_, args, { sessionId }) => mockDb().get(sessionId).brukerinformasjon(),
    sykmeldingUtenforVentetid: async (_, args, { sessionId }) => mockDb().get(sessionId).sykeldingErUtenforVentetid(),
}

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }, { sessionId }) =>
        mockDb().get(sessionId).changeSykmeldingStatus(sykmeldingId, status),
    sendSykmelding: async (_, { sykmeldingId, values }, { sessionId }) =>
        mockDb().get(sessionId).sendSykmelding(sykmeldingId, values),
    updateEgenmeldingsdager: async (_, { sykmeldingId, egenmeldingsdager }, { sessionId }) =>
        mockDb().get(sessionId).updateEgenmeldingsdager(sykmeldingId, egenmeldingsdager),

    // DevTools mutations that are only implemented in mockResolvers, not the real resolvers
    dev_changeScenario: async (_, { scenario }, context) => {
        mockDb().set(context.sessionId, scenario as Scenarios)
        return true
    },
    dev_toggleStrengtFortroligAdresse: async (_, args, { sessionId }) => {
        mockDb().get(sessionId).toggleStrengtFortroligAdresse()
        return true
    },
    dev_setAntallArbeidsgivere: async (_, { antall }, { sessionId }) => {
        mockDb().get(sessionId).setAntallArbeidsgivere(antall)
        return true
    },
}

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
    ...objectResolvers,
}

export default resolvers
