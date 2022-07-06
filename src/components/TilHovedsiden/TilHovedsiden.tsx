import React from 'react';
import { Back } from '@navikt/ds-icons';
import { BodyShort, Link } from '@navikt/ds-react';

import { getPublicEnv } from '../../utils/env';

import styles from './TilHovedsiden.module.css';

const publicEnv = getPublicEnv();

const TilHovedsiden: React.FC = () => {
    return (
        <Link href={publicEnv.SYKEFRAVAER_ROOT} className={styles.tilHovedsiden}>
            <Back />
            <BodyShort>Til hovedsiden ditt sykefravær</BodyShort>
        </Link>
    );
};

export default TilHovedsiden;
