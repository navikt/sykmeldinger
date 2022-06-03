import type { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from '../../utils/logger';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    const { level, ts, ...rest }: pino.LogEvent = req.body;

    rest.messages.forEach((msg) => {
        const log = typeof msg === 'string' ? { msg } : msg;
        const label = level.label as unknown as LogLevels;
        logger[label]({ ...log, x_timestamp: ts, x_isFrontend: true, x_userAgent: req.headers['user-agent'] });
    });

    res.status(200).json({ ok: `ok` });
};

export default handler;
