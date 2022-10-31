import NodeCache from 'node-cache'

declare global {
    // eslint-disable-next-line no-var
    var _tokenCache: NodeCache
}

global._tokenCache = global._tokenCache || new NodeCache()

export default global._tokenCache
