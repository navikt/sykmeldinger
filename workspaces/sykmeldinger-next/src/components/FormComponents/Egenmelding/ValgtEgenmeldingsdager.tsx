import { ReactElement } from 'react'
import { Button, Heading } from '@navikt/ds-react'

import { toDateString, toReadableDate } from '../../../utils/dateUtils'
import { pluralize } from '../../../utils/stringUtils'

import styles from './ValgtEgenmeldingsdager.module.css'

interface Props {
    dates: Date[]
    onEditClicked: () => void
}

function ValgtEgenmeldingsdager({ dates, onEditClicked }: Props): ReactElement {
    const headingId = `egenmeldingList-${dates.map(toDateString).join('-')}`

    return (
        <div className={styles.egenmeldingListWrapper}>
            <Heading id={headingId} size="xsmall" level="3">
                {`Du brukte ${pluralize('egenmeldingsdag', dates.length)}`}
            </Heading>
            <ul aria-labelledby={headingId} className={styles.egenmeldingList}>
                {dates.map((date: Date) => (
                    <li key={date.toISOString()}>{toReadableDate(date)}</li>
                ))}
            </ul>
            <Button type="button" variant="secondary" onClick={() => onEditClicked()}>
                Endre
            </Button>
        </div>
    )
}

export default ValgtEgenmeldingsdager
