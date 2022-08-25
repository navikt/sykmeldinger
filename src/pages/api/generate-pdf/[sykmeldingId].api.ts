import { NextApiRequest, NextApiResponse } from 'next';

import { generateSykmeldingPdfServerSide } from '../../../server/pdf/pdf';
import { logger } from '../../../utils/logger';
import { createRequestContext, withAuthenticatedApi } from '../../../auth/withAuthentication';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const sykmeldingId = req.query.sykmeldingId;
    if (typeof sykmeldingId !== 'string') {
        logger.error(`Invalid PDF generation request, sykmeldingId is of type ${typeof sykmeldingId}`);
        res.status(400);
        res.send('Invalid request');
        return;
    }

    const context = createRequestContext(req);

    if (!context) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    logger.info(`Creating PDF for sykmeldingId: ${sykmeldingId}, traceId: ${context.userTraceId}`);
    const pdfAsString = await generateSykmeldingPdfServerSide(sykmeldingId, context);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'filename="sykmelding.pdf"');
    res.end(pdfAsString);
}

export default withAuthenticatedApi(handler);
