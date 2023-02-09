import { renderToBuffer } from '@react-pdf/renderer'

import { Sykmelding } from '../api-models/sykmelding/Sykmelding'
import { getSykmelding } from '../sykmeldingerService'
import { sykmeldinger } from '../graphql/mockResolvers'
import { isLocalOrDemo } from '../../utils/env'
import { RequestContext } from '../graphql/resolvers'

import SykmeldingPdf from './components/SykmeldingPdf'

export async function generateSykmeldingPdfServerSide(sykmeldingId: string, context: RequestContext): Promise<Buffer> {
    const timestamp = new Date().toISOString()
    const sykmelding: Sykmelding = !isLocalOrDemo
        ? await getSykmelding(sykmeldingId, context)
        : await getMockSykmelding(sykmeldingId)

    return await renderToBuffer(<SykmeldingPdf sykmelding={sykmelding} timestamp={timestamp} />)
}

async function getMockSykmelding(id: string): Promise<Sykmelding> {
    const relevantSykmelding = sykmeldinger.find((it) => it.id === id)
    if (!relevantSykmelding) {
        throw new Error(`Unable to find sykmelding by id: ${id}`)
    }
    return relevantSykmelding
}
