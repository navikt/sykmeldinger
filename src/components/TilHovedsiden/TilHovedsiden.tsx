import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

import { getPublicEnv } from '../../utils/env';

import styles from './TilHovedsiden.module.css';

const publicEnv = getPublicEnv();

const TilHovedsiden: React.FC = () => {
    return (
        <Lenke href={publicEnv.SYKEFRAVAER_ROOT} className={styles.tilHovedsiden}>
            <VenstreChevron className={styles.tilHovedsidenChevron} />
            <Normaltekst>Til hovedsiden ditt sykefravær</Normaltekst>
        </Lenke>
    );
};

export default TilHovedsiden;
