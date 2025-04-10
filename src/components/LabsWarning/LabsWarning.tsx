import { Alert } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { isE2E, isLocalOrDemo } from '../../utils/env'

export function LabsWarning(): ReactElement | null {
    if (!isLocalOrDemo || isE2E) {
        return null
    }

    return (
        <div className="mx-auto max-w-2xl">
            <Alert className="m-4 mt-0" variant="warning" role="status">
                Dette er en demoside og inneholder ikke dine personlige data.
            </Alert>
        </div>
    )
}
