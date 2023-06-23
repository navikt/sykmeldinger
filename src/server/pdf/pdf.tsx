import { renderToBuffer } from '@react-pdf/renderer'

import { Sykmelding } from '../api-models/sykmelding/Sykmelding'
import { getSykmelding } from '../sykmeldingerService'
import { isLocalOrDemo } from '../../utils/env'
import { RequestContext } from '../graphql/resolvers'
import mockDb from '../graphql/mock-db'

import SykmeldingPdf from './components/SykmeldingPdf'

export async function generateSykmeldingPdfServerSide(sykmeldingId: string, context: RequestContext): Promise<Buffer> {
    const timestamp = new Date().toISOString()
    const sykmelding: Sykmelding = !isLocalOrDemo
        ? await getSykmelding(sykmeldingId, context)
        : await getMockSykmelding(sykmeldingId, context.sessionId)

    return await renderToBuffer(<SykmeldingPdf sykmelding={sykmelding} timestamp={timestamp} />)
}

async function getMockSykmelding(id: string, sessionId: string): Promise<Sykmelding> {
    return mockDb().get(sessionId).sykmelding(id)
}
