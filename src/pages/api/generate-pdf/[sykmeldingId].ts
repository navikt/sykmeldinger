import { NextApiRequest, NextApiResponse } from 'next'
import { createChildLogger } from '@navikt/next-logger'

import { generateSykmeldingPdfServerSide } from '../../../server/pdf/pdf'
import { createDemoRequestContext, createRequestContext, withAuthenticatedApi } from '../../../auth/withAuthentication'
import { isLocalOrDemo } from '../../../utils/env'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const context = !isLocalOrDemo ? createRequestContext(req) : createDemoRequestContext(req)

    if (!context) {
        res.status(401).json({ message: 'Access denied' })
        return
    }

    const childLogger = createChildLogger(context.requestId)

    const sykmeldingId = req.query.sykmeldingId
    if (typeof sykmeldingId !== 'string') {
        childLogger.error(`Invalid PDF generation request, sykmeldingId is of type ${typeof sykmeldingId}`)
        res.status(400)
        res.send('Invalid request')
        return
    }

    childLogger.info(`Creating PDF for sykmeldingId: ${sykmeldingId}, requestId: ${context.requestId}`)
    const pdfAsBuffer: Buffer = await generateSykmeldingPdfServerSide(sykmeldingId, context)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-disposition', 'filename="sykmelding.pdf"')
    res.end(pdfAsBuffer)
}

export default withAuthenticatedApi(handler)
