import { People } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';
import { Pasient } from '../../../../../fetching/graphql.generated';
import { getPasientName } from '../../../../../utils/pasientUtils';

import styles from './SykmeldingenGjelderView.module.css';

interface Props {
    pasient?: Pasient | null;
}

function SykmeldingenGjelderView({ pasient }: Props): JSX.Element | null {
    if (!pasient) return null;

    const name = getPasientName(pasient);
    if (!name) return null;

    return (
        <div>
            <SykmeldtHeading title="Sykmeldingen gjelder" Icon={People} />
            <div className={styles.content}>
                <BodyShort size="small">{name}</BodyShort>
                {pasient.fnr && <BodyShort size="small">Fødselsnr: {pasient.fnr}</BodyShort>}
            </div>
        </div>
    );
}

export default SykmeldingenGjelderView;
