import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

import env from '../../utils/env';

import styles from './TilHovedsiden.module.css';

const TilHovedsiden: React.FC = () => {
    return (
        <Lenke href={env.SYKEFRAVAER_ROOT || '#'} className={styles.tilHovedsiden}>
            <VenstreChevron className={styles.tilHovedsidenChevron} />
            <Normaltekst>Til hovedsiden ditt sykefravær</Normaltekst>
        </Lenke>
    );
};

export default TilHovedsiden;
