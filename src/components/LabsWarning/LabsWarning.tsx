import { Alert } from '@navikt/ds-react'
import React from 'react'

import styles from './LabsWarning.module.css'

export function LabsWarning(): JSX.Element | null {
    return (
        <Alert className={styles.limit} variant={'warning'}>
            Dette er en demoside og inneholder ikke dine personlige data.
        </Alert>
    )
}
