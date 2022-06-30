import { BodyShort, Heading } from '@navikt/ds-react';

import { Pasient } from '../../../../../fetching/graphql.generated';
import { getPasientName } from '../../../../../utils/pasientUtils';

import styles from './PasientView.module.css';

interface PasientViewProps {
    pasient?: Pasient | null;
}

function PasientView({ pasient }: PasientViewProps): JSX.Element | null {
    if (!pasient) {
        return null;
    }

    const name = getPasientName(pasient);

    if (!name) {
        return null;
    }

    return (
        <div className={styles.pasientView}>
            <Heading size="xsmall" level="3">
                Sykmeldingen gjelder
            </Heading>
            <BodyShort size="small">{name}</BodyShort>
            {pasient.fnr && <BodyShort size="small">{pasient.fnr}</BodyShort>}
        </div>
    );
}

export default PasientView;
