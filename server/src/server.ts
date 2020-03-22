import express from 'express';
import path from 'path';

const server = express();
const PORT = process.env['PORT'] || 4000;

try {
    server.use(express.static(path.join(__dirname, '../../client/build')));
    server.listen(PORT, () => {});
} catch (error) {
    console.error('Error during startup', error);
}
