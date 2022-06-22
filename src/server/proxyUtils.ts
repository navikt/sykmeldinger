import { NextApiRequest, NextApiResponse } from 'next';
import { Logger } from 'pino';

import { logger as parentLogger } from '../utils/logger';

export function getBody(req: NextApiRequest): string | undefined {
    if (req.method === 'GET' || req.method === 'DELETE') {
        return undefined;
    }

    return req.body ? JSON.stringify(req.body) : undefined;
}

export function getHeaders(req: NextApiRequest): Record<string, string> {
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

export function getRequestLogger(req: NextApiRequest, res: NextApiResponse): Logger {
    const requestId = req.headers['x-request-id'];
    res.setHeader('x-request-id', requestId ?? 'missing');

    return parentLogger.child({ 'x-request-id': requestId });
}
