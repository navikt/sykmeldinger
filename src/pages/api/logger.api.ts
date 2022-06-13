import type { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from '../../utils/logger';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    const { level, ts, ...rest }: pino.LogEvent = req.body;

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
            });
            return;
        }

        logger[label]({ ...log, x_timestamp: ts, x_isFrontend: true, x_userAgent: req.headers['user-agent'] });
    });

    res.status(200).json({ ok: `ok` });
};

export default handler;
