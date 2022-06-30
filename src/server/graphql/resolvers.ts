import { GraphQLJSON } from 'graphql-scalars';

import * as sykmeldingerService from '../../server/sykmeldingerService';
import * as flexService from '../../server/flexService';

import { MutationResolvers, QueryResolvers, Resolvers } from './resolver-types.generated';

export interface ResolverContextType {
    selvbetjeningsToken: string;
}

const Query: QueryResolvers = {
    sykmeldinger: async (_, args, context) => sykmeldingerService.getSykmeldinger(context.selvbetjeningsToken),
    sykmelding: async (_, { id }, context) => sykmeldingerService.getSykmelding(id, context.selvbetjeningsToken),
    brukerinformasjon: async (_, args, context) =>
        sykmeldingerService.getBrukerinformasjon(context.selvbetjeningsToken),
    sykmeldingUtenforVentetid: async (_, { id }, context) =>
        flexService.getErUtenforVentetid(id, context.selvbetjeningsToken),
};

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }, context) =>
        sykmeldingerService.changeSykmeldingStatus(sykmeldingId, status, context.selvbetjeningsToken),
    submitSykmelding: async (_, { sykmeldingId, values }, context) =>
        sykmeldingerService.submitSykmelding(sykmeldingId, values, context.selvbetjeningsToken),
};

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
};

export default resolvers;
