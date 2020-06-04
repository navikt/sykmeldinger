import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import morganBody from 'morgan-body';

const server = express();
const PORT = process.env['PORT'] || 3000;

const corsOptions: CorsOptions = {
    origin: '*',
};

try {
    morganBody(server);
    server.use(express.static(path.join(__dirname, '../../client/build'), { etag: false })); // etag for turning off caching. not sure if this is the best way to deal with caching
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));

    server.get('/is_alive', (_req, res) => res.status(200).send('alive'));
    server.get('/is_ready', (_req, res) => res.status(200).send('ready'));

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
} catch (error) {
    console.error('Error during startup', error);
}
