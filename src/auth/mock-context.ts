import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { v4 } from 'uuid'
import { logger } from '@navikt/next-logger'

import { isValidScenario } from '../server/graphql/mock-db/scenarios'
import mockDb from '../server/graphql/mock-db'

import { ServerSidePropsResult } from './withAuthentication'

export function handleMockContext(
    context: GetServerSidePropsContext,
    handler: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ServerSidePropsResult>>,
): Promise<GetServerSidePropsResult<ServerSidePropsResult>> {
    const scenario = context.query.scenario as string | undefined
    const antallArbeidsgivere = context.query.antallArbeidsgivere as string | undefined

    logger.info(`Setting up mock context, scenario: ${scenario}, antallArbeidsgivere: ${antallArbeidsgivere}`)

    if (isValidScenario(scenario) || antallArbeidsgivere) {
        const newId = v4()
        context.res.setHeader('set-cookie', `next-session-id=${newId}; Path=/`)

        if (isValidScenario(scenario)) {
            mockDb().set(newId, scenario)
        } else {
            mockDb().set(newId, 'normal')
        }

        if (antallArbeidsgivere) {
            mockDb().get(newId).setAntallArbeidsgivere(+antallArbeidsgivere)
        }
    } else if (!context.req.cookies['next-session-id']) {
        const newId = v4()
        context.res.setHeader('set-cookie', `next-session-id=${newId}; Path=/`)
    }

    return handler(context)
}
