import { Button, Heading } from '@navikt/ds-react'

import { toReadableDate } from '../../../utils/dateUtils'

import styles from './ValgtEgenmeldingsdager.module.css'

interface Props {
    dates: Date[]
    onEditClicked: () => void
}

function ValgtEgenmeldingsdager({ dates, onEditClicked }: Props): JSX.Element {
    return (
        <div className={styles.egenmeldingListWrapper}>
            <Heading id="egenmeldingList" size="xsmall" level="3">
                Du brukte {dates.length} egenmeldingsdager
            </Heading>
            <ul aria-labelledby="egenmeldingList" className={styles.egenmeldingList}>
                {dates.map((date: Date) => (
                    <li key={date.toISOString()}>{toReadableDate(date)}</li>
                ))}
            </ul>
            <Button variant="secondary" onClick={() => onEditClicked()}>
                Endre
            </Button>
        </div>
    )
}

export default ValgtEgenmeldingsdager
