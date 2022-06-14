import { NextApiRequest, NextApiResponse } from 'next';
import { File, Bucket, Storage } from '@google-cloud/storage';

import { logger } from '../../utils/logger';

const bucketName: string | undefined = process.env.GSC_BUCKET_NAME;
const storage = new Storage();
const bucket: Bucket | null = bucketName ? storage.bucket(bucketName) : null;

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!bucket) {
        logger.warn('Bucket not configured, skipping');
        res.status(200).json({ ok: 'ok' });
        return;
    }

    const file: File = bucket.file(`${Math.random() * 100000}`);
    try {
        await file.save(JSON.stringify(req.body));
        logger.info('Saved debug item to bucket');
    } catch (e) {
        logger.warn('Unable to save debug item to bucket');
        logger.warn(e);
    }
};

export default handler;
