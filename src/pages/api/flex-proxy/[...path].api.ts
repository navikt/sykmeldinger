import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    logger.warn('Someone hit the old flex-proxy API endpoint with old code, force them to login');

    res.status(401);
    res.json({ message: 'Du har blitt logget ut' });
};

export default handler;
