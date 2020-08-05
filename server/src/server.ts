import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../src/.env') });
import express from 'express';
import cors, { CorsOptions } from 'cors';
import mustacheExpress from 'mustache-express';
import getDecorator from './decorator';
import logger from './logger';

const server = express();
const PORT = process.env['PORT'] || 3000;
const BUILD_PATH = path.join(__dirname, '../../client/build');

server.set('views', BUILD_PATH);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const corsOptions: CorsOptions = {
    origin: '*', // TODO: change to only allow requests from certain domains
};

try {
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));

    // nais urls
    server.get('/is_alive', (_req, res) => res.status(200).send('alive'));
    server.get('/is_ready', (_req, res) => res.status(200).send('ready'));

    server.use(express.static(BUILD_PATH, { etag: false })); // etag for turning off caching. not sure if this is the best way to deal with caching

    // match all routes that are not in the static folder
    server.use(/^(?!.*\/static\/).*$/, (req, res) => {
        getDecorator()
            .then((decoratorFragments) => {
                res.render('index.html', decoratorFragments);
            })
            .catch((e) => {
                const error = `Failed to get decorator: ${e}`;
                logger.error(error);
                res.status(500).send(error);
            });
    });

    server.listen(PORT, () => {
        logger.info(`Server running on port: ${PORT}`);
    });
} catch (error) {
    logger.error('Error during startup', error);
}
