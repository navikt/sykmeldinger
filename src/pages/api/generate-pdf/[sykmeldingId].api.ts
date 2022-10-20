import { NextApiRequest, NextApiResponse } from 'next';
import { createChildLogger } from '@navikt/next-logger';

import { generateSykmeldingPdfServerSide } from '../../../server/pdf/pdf';
import { createRequestContext, withAuthenticatedApi } from '../../../auth/withAuthentication';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const context = createRequestContext(req);

    if (!context) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    const childLogger = createChildLogger(context.requestId);

    const sykmeldingId = req.query.sykmeldingId;
    if (typeof sykmeldingId !== 'string') {
        childLogger.error(`Invalid PDF generation request, sykmeldingId is of type ${typeof sykmeldingId}`);
        res.status(400);
        res.send('Invalid request');
        return;
    }

    childLogger.info(`Creating PDF for sykmeldingId: ${sykmeldingId}, requestId: ${context.requestId}`);
    const pdfAsString = await generateSykmeldingPdfServerSide(sykmeldingId, context);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'filename="sykmelding.pdf"');
    res.end(pdfAsString);
}

export default withAuthenticatedApi(handler);
