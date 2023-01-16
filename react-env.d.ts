import { ReactEventHandler } from 'react'

// Temporary hack that can be removed once we bump to react 18
declare global {
    namespace React {
        interface DOMAttributes<T> {
            onResize?: ReactEventHandler<T> | undefined
            onResizeCapture?: ReactEventHandler<T> | undefined
            nonce?: string | undefined
        }
    }
}
