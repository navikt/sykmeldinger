import { renderToString } from '@react-pdf/renderer'

import { Sykmelding } from '../api-models/sykmelding/Sykmelding'
import { getSykmelding } from '../sykmeldingerService'
import { isLocalOrDemo } from '../../utils/env'
import { RequestContext } from '../graphql/resolvers'
import mockDb from '../graphql/mockDb'

import SykmeldingPdf from './components/SykmeldingPdf'

export async function generateSykmeldingPdfServerSide(sykmeldingId: string, context: RequestContext): Promise<string> {
    const timestamp = new Date().toISOString()
    const sykmelding: Sykmelding = !isLocalOrDemo
        ? await getSykmelding(sykmeldingId, context)
        : await mockDb().getSykmeldingById(sykmeldingId)

    return await renderToString(<SykmeldingPdf sykmelding={sykmelding} timestamp={timestamp} />)
}
