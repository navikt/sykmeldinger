import NavFrontendChevron from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';

import styles from './Lukknapp.module.css';

interface LukknappProps {
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Lukknapp: React.FC<LukknappProps> = ({ onClick }) => (
    <button type="button" onClick={onClick} className={styles.lukknapp}>
        <Element className={styles.buttonText}>Lukk</Element>
        <NavFrontendChevron type="opp" />
    </button>
);

export default Lukknapp;
