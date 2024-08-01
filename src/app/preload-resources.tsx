'use client'

import ReactDOM from 'react-dom'

function PreloadResources(): null {
    ReactDOM.preload('https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2', {
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
    })
    ReactDOM.preload('https://www.nav.no/favicon.ico', {
        as: 'image',
        type: 'image/x-icon',
    })

    return null
}

export default PreloadResources
