import { GraphQLJSON } from 'graphql-scalars'

import * as sykmeldingerService from '../../server/sykmeldingerService'
import * as flexService from '../../server/flexService'

import { MutationResolvers, QueryResolvers, Resolvers } from './resolver-types.generated'
import objectResolvers from './objectResolvers'

export interface RequestContext {
    pid: string
    accessToken: string
    requestId: string
    sessionId: string
}

const Query: QueryResolvers = {
    sykmeldinger: async (_, args, context) => sykmeldingerService.getSykmeldinger(context),
    sykmelding: async (_, { id }, context) => sykmeldingerService.getSykmelding(id, context),
    brukerinformasjon: async (_, { id }, context) => sykmeldingerService.getBrukerinformasjonById(id, context),
    sykmeldingUtenforVentetid: async (_, { id }, context) => flexService.getErUtenforVentetid(id, context),
    tidligereArbeidsgivere: async (_, { id }, context) => sykmeldingerService.getTidligereArbeidsgivere(id, context),
}

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }, context) =>
        sykmeldingerService.changeSykmeldingStatus(sykmeldingId, status, context),
    sendSykmelding: async (_, { sykmeldingId, values }, context) =>
        sykmeldingerService.sendSykmelding(sykmeldingId, values, context),
    updateEgenmeldingsdager: async (_, { sykmeldingId, egenmeldingsdager }, context) =>
        sykmeldingerService.updateEgenmeldingsdager(sykmeldingId, egenmeldingsdager, context),
    feedback: async (_, { feedback }, context) => flexService.feedback(feedback, context),
}

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
    ...objectResolvers,
}

export default resolvers
