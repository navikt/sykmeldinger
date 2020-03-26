import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';

const server = express();
const PORT = process.env['PORT'] || 3000;

const corsOptions: CorsOptions = {
    origin: '*'
}

try {

    server.use(cors(corsOptions));

    server.get('/is_alive', (_req, res) => res.status(200).send('alive'));
    server.get('/is_ready', (_req, res) => res.status(200).send('ready'));
    
    server.use('*', express.static(path.join(__dirname, '../../client/build')));

    server.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
} catch (error) {
    console.error('Error during startup', error);
}
