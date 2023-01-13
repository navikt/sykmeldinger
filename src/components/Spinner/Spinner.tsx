import { Heading, Loader } from '@navikt/ds-react'

import styles from './Spinner.module.css'

interface SpinnerProps {
    headline: string
}

function Spinner({ headline }: SpinnerProps): JSX.Element {
    return (
        <div className={styles.spinnerContainer}>
            <Heading size="medium" className={styles.undertitle}>
                {headline}
            </Heading>
            <Loader />
        </div>
    )
}

export default Spinner
