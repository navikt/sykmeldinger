const express = require('express');
const path = require('path')

console.log('Starting server')
const app = express();

app.disable('x-powered-by')
app.use((_req, res, next) => {
    // Disable caching
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Expires', '0')
    res.setHeader('Surrogate-Control', 'no-store')
    next();
});

app.get('/is_alive', (_req, res) => {
    res.status(200).send('Alive');
});
app.get('/is_ready', (_req, res) => {
    res.status(200).send('Ready');
});

const STATIC_FILES_PATH = path.join(__dirname, '/build');
app.use(express.static(STATIC_FILES_PATH));
app.get('*', (_req, res) => {
    res.sendFile(STATIC_FILES_PATH + '/index.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
