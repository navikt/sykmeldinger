import { BodyShort, Heading } from '@navikt/ds-react'

import styles from './ListEntry.module.css'

interface ListEntryProps {
    listText: string[]
    listTitle: string
}

function ListEntry({ listText, listTitle }: ListEntryProps): JSX.Element {
    return (
        <div className={styles.listEntry}>
            <Heading size="xsmall" level="4">
                {listTitle}
            </Heading>
            <ul>
                {listText.map((str, index) => (
                    <li className={styles.listEntryText} key={index}>
                        <BodyShort>{str}</BodyShort>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListEntry
