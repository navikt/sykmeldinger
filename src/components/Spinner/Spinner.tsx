import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';

import styles from './Spinner.module.css';

interface SpinnerProps {
    headline: string;
}

const Spinner: React.FC<SpinnerProps> = ({ headline }) => (
    <div className={styles.spinnerContainer}>
        <Undertittel className={styles.undertitle}>{headline}</Undertittel>
        <NavFrontendSpinner />
    </div>
);

export default Spinner;
