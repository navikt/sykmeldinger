import { Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import styles from './Spinner.module.css'

interface SpinnerProps {
    headline: string
}

const Spinner: React.FC<SpinnerProps> = ({ headline }) => (
    <div className={styles.spinnerContainer}>
        <Heading size="medium" className={styles.undertitle}>
            {headline}
        </Heading>
        <Loader />
    </div>
)

export default Spinner
