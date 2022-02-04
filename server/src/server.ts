import path from 'path';

import express, { Request, Response } from 'express';

import getHtmlWithDecorator from './decorator';
import { createClientEnv, disableCache } from './utils';
import logger from './logging';

const PUBLIC_URL = process.env.PUBLIC_URL;
const STATIC_FILES_PATH = path.join(__dirname, process.env.NODE_ENV === 'production' ? './build' : '../../build');

export function startServer(): void {
    logger.info('Starting server');

    const app = express();

    app.get(`${PUBLIC_URL}/env-config.js`, (_, res: Response): void => {
        disableCache(res)
            .contentType('application/javascript; charset=UTF-8')
            .status(200)
            .send(`window._env_ = ${JSON.stringify(createClientEnv())}`);
    });
    app.use(`${PUBLIC_URL}`, express.static(STATIC_FILES_PATH, { index: false }));

    app.get('/internal/is_alive|is_ready', (_req, res: Response): void => {
        res.status(200).send('Alive & Ready');
    });

    app.use(`*`, (req: Request, res: Response): void => {
        if (!req.header('accept')?.includes('text/html')) {
            res.status(400);
            res.send();
            return;
        }

        const referrer = req.get('Referrer');
        if (referrer) {
            logger.info('Referer: ', referrer);
        }

        getHtmlWithDecorator(`${STATIC_FILES_PATH}/index.html`)
            .then((html) => {
                disableCache(res).send(html);
            })
            .catch((e) => {
                logger.error(e);
                res.status(500).send(e);
            });
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        logger.info(`Listening on PORT: ${PORT}`);
    });
}
