import type { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from '../../utils/logger';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;
type WithTrace = { x_trace?: string };

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    const { level, ts, x_trace, ...rest }: pino.LogEvent & WithTrace = req.body;

    rest.messages.forEach((msg) => {
        const log = typeof msg === 'string' ? { msg } : msg;
        const label = level.label as unknown as LogLevels;

        /*
         Reduce the log level of these two entries, as they are caused by something
         nextjs internal. TODO: Only temporary while we figure this out.
        */
        if (
            log.msg.includes('Unexpected end of JSON input') ||
            log.msg.includes('The string did not match the expected pattern')
        ) {
            logger.warn({
                ...log,
                x_timestamp: ts,
                x_isFrontend: true,
                x_isSquelched: true,
                x_userAgent: req.headers['user-agent'],
                x_trace,
            });
            return;
        }

        logger[label]({ ...log, x_timestamp: ts, x_isFrontend: true, x_userAgent: req.headers['user-agent'], x_trace });
    });

    res.status(200).json({ ok: `ok` });
};

export default handler;
