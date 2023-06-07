import { Alert } from '@navikt/ds-react'
import React from 'react'

import { isLocalOrDemo } from '../../utils/env'

export function LabsWarning(): JSX.Element | null {
    if (!isLocalOrDemo) {
        return null
    }

    return (
        <Alert className="mx-auto mb-4 max-w-2xl" variant="warning">
            Dette er en demoside og inneholder ikke dine personlige data.
        </Alert>
    )
}
