import { GraphQLJSON } from 'graphql-scalars'
import { logger } from '@navikt/next-logger'
import * as R from 'remeda'

import { dateSub, toDateString } from '../../utils/dateUtils'
import { mapSendSykmeldingValuesToV3Api } from '../sendSykmeldingMapping'
import { Sykmelding as SykmeldingApiModel } from '../api-models/sykmelding/Sykmelding'
import { Sporsmal, Svartype } from '../api-models/sykmelding/SykmeldingStatus'
import { sporsmal } from '../../utils/sporsmal'

import {
    MutationResolvers,
    QueryResolvers,
    Resolvers,
    ShortName,
    StatusEvent,
    Sykmelding,
    SykmeldingChangeStatus,
    ArbeidssituasjonType,
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

        const sporsmalOgSvarListe: Sporsmal[] = R.compact([
            {
                shortName: ShortName.ARBEIDSSITUASJON,
                svar: {
                    svarType: Svartype.ARBEIDSSITUASJON,
                    svar: values.arbeidssituasjon as ArbeidssituasjonType,
                },
                tekst: 'Hva er din arbeidssituasjon?',
            },
            values.egenmeldingsdager != null && values.egenmeldingsdager.length > 0
                ? {
                      shortName: ShortName.EGENMELDINGSDAGER,
                      tekst: 'Brukte du egenmeldingsdager?',
                      svar: {
                          svarType: Svartype.DAGER,
                          svar: values.egenmeldingsdager as string[],
                      },
                  }
                : null,
        ])

        if (values.arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER) {
            sykmelding.sykmeldingStatus.statusEvent = StatusEvent.SENDT
        } else {
            sykmelding.sykmeldingStatus.statusEvent = StatusEvent.BEKREFTET
        }
        sykmelding.sykmeldingStatus.sporsmalOgSvarListe = sporsmalOgSvarListe

        return sykmelding
    },
    updateEgenmeldingsdager: async (_, { sykmeldingId, egenmeldingsdager }) => {
        const sykmelding = sykmeldinger.find((it) => it.id === sykmeldingId)
        if (!sykmelding) {
            throw new Error(`Unable to find sykmelding by sykmeldingId: ${sykmeldingId}`)
        }

        const index = sykmelding.sykmeldingStatus.sporsmalOgSvarListe.findIndex(
            (it) => it.shortName === ShortName.EGENMELDINGSDAGER,
        )

        const egenmeldingssporsmal: Sporsmal = {
            tekst:
                index >= 0 ? sykmelding.sykmeldingStatus.sporsmalOgSvarListe[index].tekst : sporsmal.egenmeldingsdager,
            shortName: ShortName.EGENMELDINGSDAGER,
            svar: {
                svarType: Svartype.DAGER,
                svar: egenmeldingsdager,
            },
        }

        if (index >= 0) {
            sykmelding.sykmeldingStatus.sporsmalOgSvarListe[index] = egenmeldingssporsmal
        } else if (egenmeldingssporsmal.svar.svar.length > 0) {
            sykmelding.sykmeldingStatus.sporsmalOgSvarListe.push(egenmeldingssporsmal)
        }

        sykmelding.sykmeldingStatus.timestamp = toDateString(new Date())

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
