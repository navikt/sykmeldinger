import { NextApiRequest, NextApiResponse } from 'next';

import { logger } from '../../../utils/logger';
import { getServerEnv, isLocalOrDemo } from '../../../utils/env';

import { handleMockRequest } from './mock/mock';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!Array.isArray(req.query.path)) {
        res.status(400).json({ message: 'Malformed parameter' });
        return;
    }

    if (isLocalOrDemo) {
        handleMockRequest(req, res, req.query.path);
        return;
    }

    const path = req.query.path.join('/');
    const url = `${getServerEnv().SYKMELDINGER_BACKEND}/api/${path}`;

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
        logger.error(`Proxy request failed: ${result.status} ${result.statusText}`);
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
            res.status(500).json('Internal server error');
            return;
        }
    }

    res.status(result.status).json({ ok: 'ok' });
};

function getBody(req: NextApiRequest): string | undefined {
    if (req.method === 'GET' || req.method === 'DELETE') {
        return undefined;
    }

    return req.body ? JSON.stringify(req.body) : undefined;
}

function getHeaders(req: NextApiRequest): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (req.headers['sykmeldt-fnr']) {
        headers['Sykmeldt-Fnr'] = req.headers['sykmeldt-fnr'] as string;
    }

    if (req.headers['cookie']) {
        headers['Cookie'] = req.headers['cookie'] as string;
    }

    return headers;
}

export default handler;
