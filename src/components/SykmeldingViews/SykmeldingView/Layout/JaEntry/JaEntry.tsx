import { BodyShort, Heading } from '@navikt/ds-react'

import styles from './JaEntry.module.css'

interface JaEntryProps {
    title: string
}

function JaEntry({ title }: JaEntryProps): JSX.Element {
    return (
        <div>
            <Heading size="xsmall" level="4">
                {title}
            </Heading>
            <BodyShort size="small" className={styles.jaEntryText}>
                Ja
            </BodyShort>
        </div>
    )
}

export default JaEntry
