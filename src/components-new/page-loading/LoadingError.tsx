'use client'

import React from 'react'
import { Alert } from '@navikt/ds-react'

function LoadingError({ message }: { message: string }): JSX.Element {
    return (
        <div>
            <Alert variant="error">{message}</Alert>
        </div>
    )
}

export default LoadingError
