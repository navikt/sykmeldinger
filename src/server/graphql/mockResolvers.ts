import { GraphQLJSON } from 'graphql-scalars'
import { logger } from '@navikt/next-logger'

import { dateSub } from '../../utils/dateUtils'
import { mapSendSykmeldingValuesToV3Api } from '../sendSykmeldingMapping'
import { Sykmelding as SykmeldingApiModel } from '../api-models/sykmelding/Sykmelding'

import {
    MutationResolvers,
    QueryResolvers,
    Resolvers,
    Sykmelding,
    StatusEvent,
    SykmeldingChangeStatus,
} from './resolver-types.generated'
import { sykmeldingApen } from './mockData/sykmelding-apen'
import { sykmeldingApenPapir } from './mockData/sykmelding-apen-papir'
import { sykmeldingSendt } from './mockData/sykmelding-sendt'
import { sykmeldingSendt2 } from './mockData/sykmelding-sendt-2'
import { sykmeldingSendt3 } from './mockData/sykmelding-sendt-3'
import { sykmeldingBekreftet } from './mockData/sykmelding-bekreftet'
import { sykmeldingAvvist } from './mockData/sykmelding-avvist'
import { sykmeldingAvvistBekreftet } from './mockData/sykmelding-avvist-bekreftet'
import { sykmeldingAvbrutt } from './mockData/sykmelding-avbrutt'
import { sykmeldingUtgatt } from './mockData/sykmelding-utgatt'
import { sykmeldingEgenmeldt } from './mockData/sykmelding-egenmeldt'
import { sykmeldingUnderbehandlingTilbakedatering } from './mockData/sykmelding-under-behandling-tilbakedatering'
import { sykmeldingUgyldigTilbakedatering } from './mockData/sykmelding-ugyldig-tilbakedatering'
import arbeidsgivereMock from './mockData/arbeidsgivereMock'
import objectResolvers from './objectResolvers'

export const sykmeldinger: SykmeldingApiModel[] = [
    sykmeldingApen(),
    sykmeldingApen(dateSub(new Date(), { hours: 1 }), 'APENNI'),
    sykmeldingApenPapir(),
    sykmeldingSendt(),
    sykmeldingSendt2,
    sykmeldingSendt3,
    sykmeldingBekreftet,
    sykmeldingAvvist(),
    sykmeldingAvvistBekreftet,
    sykmeldingAvbrutt(),
    sykmeldingUtgatt,
    sykmeldingEgenmeldt,
    sykmeldingUnderbehandlingTilbakedatering(),
    sykmeldingUgyldigTilbakedatering,
]

const Query: QueryResolvers = {
    sykmeldinger: async (): Promise<Sykmelding[]> => sykmeldinger,
    sykmelding: async (_, { id }): Promise<Sykmelding> => {
        const relevantSykmelding = sykmeldinger.find((it) => it.id === id)
        if (!relevantSykmelding) {
            throw new Error(`Unable to find sykmelding by id: ${id}`)
        }
        return relevantSykmelding
    },
    brukerinformasjon: async () => {
        return { strengtFortroligAdresse: false, arbeidsgivere: arbeidsgivereMock }
    },
    sykmeldingUtenforVentetid: async function () {
        logger.warn('Using mocked data locally or in demo mode')

        return { erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' }
    },
}

const Mutation: MutationResolvers = {
    changeSykmeldingStatus: async (_, { sykmeldingId, status }) => {
        const sykmelding = sykmeldinger.find((it) => it.id === sykmeldingId)
        if (!sykmelding) {
            throw new Error(`Unable to find sykmelding by sykmeldingId: ${sykmeldingId}`)
        }

        const inputStatusToZodStatus = (status: SykmeldingChangeStatus): StatusEvent =>
            status === SykmeldingChangeStatus.AVBRYT
                ? StatusEvent.AVBRUTT
                : status === SykmeldingChangeStatus.BEKREFT_AVVIST
                ? StatusEvent.BEKREFTET
                : StatusEvent.APEN

        sykmelding.sykmeldingStatus.statusEvent = inputStatusToZodStatus(status)

        return sykmelding
    },
    sendSykmelding: async (_, { sykmeldingId, values }) => {
        const sykmelding = sykmeldinger.find((it) => it.id === sykmeldingId)
        if (!sykmelding) {
            throw new Error(`Unable to find sykmelding by sykmeldingId: ${sykmeldingId}`)
        }

        logger.warn('Using mocked data for send mutation locally or in demo mode')
        logger.info(
            `Mapped values: ${JSON.stringify(
                mapSendSykmeldingValuesToV3Api(
                    values,
                    sykmelding,
                    {
                        strengtFortroligAdresse: false,
                        arbeidsgivere: arbeidsgivereMock,
                    },
                    { erUtenforVentetid: false, oppfolgingsdato: '2021-04-10' },
                ),
                null,
                2,
            )}`,
        )
        sykmelding.sykmeldingStatus.statusEvent = StatusEvent.SENDT

        return sykmelding
    },
}

const resolvers: Partial<Resolvers> = {
    Query,
    Mutation,
    JSON: GraphQLJSON,
    ...objectResolvers,
}

export default resolvers
