import { BodyShort, Heading } from '@navikt/ds-react'

import styles from './ListEntry.module.css'

interface ListEntryProps {
    listText: string[]
    listTitle: string
    headingLevel?: '1' | '2' | '3' | '4' | '5' | '6'
}

const ListEntry: React.FC<ListEntryProps> = ({ listText, listTitle, headingLevel = '3' }) => {
    return (
        <div className={styles.listEntry}>
            <Heading size="xsmall" level={headingLevel}>
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
