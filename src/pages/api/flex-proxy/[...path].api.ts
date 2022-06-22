import { NextApiRequest, NextApiResponse } from 'next';

import { getServerEnv, isLocalOrDemo } from '../../../utils/env';
import { getBody, getHeaders, getRequestLogger } from '../../../server/proxyUtils';

import { handleFlexMockRequest } from './mock/flexMock';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const logger = getRequestLogger(req, res);

    if (!Array.isArray(req.query.path)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    if (isLocalOrDemo) {
        handleFlexMockRequest(req, res, req.query.path);
        return;
    }

    const path = req.query.path.join('/');
    const url = `${getServerEnv().FLEX_GATEWAY_ROOT}/${path}`;

    logger.info(`Proxying request to ${url}`);
    const result = await fetch(url, {
        method: req.method,
        body: getBody(req),
        headers: getHeaders(req),
    });

    if (result.status === 401) {
        res.status(401).json({ message: 'Du har blitt logget ut' });
        return;
    }

    if (!result.ok) {
        logger.error(`Flex Proxy request failed: ${result.status} ${result.statusText}`);
        res.status(result.status).json({ message: `Noe gikk galt: ${result.statusText}` });
        return;
    }

    const contentType: string | null = result.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        try {
            const jsonResponse = await result.json();
            res.status(result.status).json(jsonResponse);
            return;
        } catch (e) {
            logger.error(`Unable to JSON parse result from ${url} (${result.status} ${result.statusText})`);
            logger.error(e);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    res.status(result.status).json({ ok: 'ok' });
};

export default handler;
