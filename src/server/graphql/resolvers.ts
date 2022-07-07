import { GraphQLJSON } from 'graphql-scalars';

import * as sykmeldingerService from '../../server/sykmeldingerService';
import * as flexService from '../../server/flexService';
import { TokenPayload } from '../../auth/withAuthentication';

import { MutationResolvers, QueryResolvers, Resolvers } from './resolver-types.generated';

export interface ResolverContextType {
    payload: TokenPayload;
    accessToken: string;
}

const Query: QueryResolvers = {
    sykmeldinger: async (_, args, context) => sykmeldingerService.getSykmeldinger(context.accessToken),
    sykmelding: async (_, { id }, context) => sykmeldingerService.getSykmelding(id, context.accessToken),
    brukerinformasjon: async (_, args, context) => sykmeldingerService.getBrukerinformasjon(context.accessToken),
    sykmeldingUtenforVentetid: async (_, { id }, context) => flexService.getErUtenforVentetid(id, context.accessToken),
};

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }, context) =>
        sykmeldingerService.changeSykmeldingStatus(sykmeldingId, status, context.accessToken),
    submitSykmelding: async (_, { sykmeldingId, values }, context) =>
        sykmeldingerService.submitSykmelding(sykmeldingId, values, context.accessToken),
};

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
};

export default resolvers;
