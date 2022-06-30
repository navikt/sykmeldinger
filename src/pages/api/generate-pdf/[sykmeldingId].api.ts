import { NextApiRequest, NextApiResponse } from 'next';

import { generateSykmeldingPdfServerSide } from '../../../server/pdf/pdf';
import { logger } from '../../../utils/logger';
import { withAuthenticatedApi } from '../../../auth/withAuthentication';
import { isLocalOrDemo } from '../../../utils/env';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const sykmeldingId = req.query.sykmeldingId;
    if (typeof sykmeldingId !== 'string') {
        logger.error(`Invalid PDF generation request, sykmeldingId is of type ${typeof sykmeldingId}`);
        res.status(400);
        res.send('Invalid request');
        return;
    }

    let bearerToken;
    if (isLocalOrDemo) bearerToken = 'fake-local-auth-token';

    bearerToken = (req.headers['authorization'] as string)?.replace('Bearer ', '');

    const pdfAsString = await generateSykmeldingPdfServerSide(sykmeldingId, bearerToken);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'filename="sykmelding.pdf"');
    res.end(pdfAsString);
}

export default withAuthenticatedApi(handler);
