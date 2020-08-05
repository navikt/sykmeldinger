require('dotenv').config();
import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import morganBody from 'morgan-body';
import mustacheExpress from 'mustache-express';
import getDecorator from './decorator';

const server = express();
const PORT = process.env['PORT'] || 3000;
const BUILD_PATH = path.join(__dirname, '../../client/build');

server.set('views', BUILD_PATH);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

console.log(process.env['DECORATOR_URL']);

const corsOptions: CorsOptions = {
    origin: '*',
};

try {
    morganBody(server);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));

    // nais urls
    server.get('/is_alive', (_req, res) => res.status(200).send('alive'));
    server.get('/is_ready', (_req, res) => res.status(200).send('ready'));

    server.use(express.static(BUILD_PATH, { etag: false })); // etag for turning off caching. not sure if this is the best way to deal with caching

    server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
        getDecorator()
            .then((fragments: any) => {
                res.render('index.html', fragments);
            })
            .catch((e) => {
                const error = `Failed to get decorator: ${e}`;
                console.error(error);
                res.status(500).send(error);
            });
    });

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
} catch (error) {
    console.error('Error during startup', error);
}
