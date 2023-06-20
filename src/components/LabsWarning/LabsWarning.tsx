import { Alert } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { isLocalOrDemo } from '../../utils/env'

export function LabsWarning(): ReactElement | null {
    if (!isLocalOrDemo) {
        return null
    }

    return (
        <div className="mx-auto max-w-2xl">
            <Alert className="m-4 mt-0" variant="warning">
                Dette er en demoside og inneholder ikke dine personlige data.
            </Alert>
        </div>
    )
}
