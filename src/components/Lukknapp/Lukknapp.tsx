import { Collapse } from '@navikt/ds-icons';
import { Label } from '@navikt/ds-react';

import styles from './Lukknapp.module.css';

interface LukknappProps {
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Lukknapp = ({ onClick }: LukknappProps): JSX.Element => (
    <button type="button" onClick={onClick} className={styles.lukknapp}>
        <Label size="small" className={styles.buttonText}>
            Lukk
        </Label>
        <Collapse />
    </button>
);

export default Lukknapp;
