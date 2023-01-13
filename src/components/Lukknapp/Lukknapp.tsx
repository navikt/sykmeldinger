import { Collapse } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'

import styles from './Lukknapp.module.css'

interface LukknappProps {
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

const Lukknapp = ({ onClick }: LukknappProps): JSX.Element => (
    <button type="button" onClick={onClick} className={styles.lukknapp}>
        <BodyShort size="small" className={styles.buttonText}>
            Lukk
        </BodyShort>
        <Collapse aria-hidden />
    </button>
)

export default Lukknapp
