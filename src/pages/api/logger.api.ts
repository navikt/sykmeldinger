import type { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from '../../utils/logger';
import { isLocalOrDemo } from '../../utils/env';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;
type WithTrace = { x_trace?: string };

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    const { level, ts, x_trace, ...rest }: pino.LogEvent & WithTrace = req.body;

    rest.messages.forEach((msg) => {
        const log = typeof msg === 'string' ? { msg } : msg;
        const label = level.label as unknown as LogLevels;

        logger[label]({
            ...log,
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: req.headers['user-agent'],
            x_trace: isLocalOrDemo ? undefined : x_trace,
        });
    });

    res.status(200).json({ ok: `ok` });
};

export default handler;
