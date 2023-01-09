import { PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'

import styles from './Section.module.css'

interface Props {
    title?: string
}

function Section({ title, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <div className={styles.opplysningSection}>
            {title && (
                <Heading className={styles.title} size="small" level="3">
                    {title}
                </Heading>
            )}
            {children}
        </div>
    )
}

export default Section
