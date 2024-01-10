import httpProxy from 'http-proxy'

console.info('Starting proxy server')
httpProxy
    .createProxyServer({ target: 'http://app:3000' })
    .listen(3000)
    .on('start', () => console.info('Proxy server started'))
