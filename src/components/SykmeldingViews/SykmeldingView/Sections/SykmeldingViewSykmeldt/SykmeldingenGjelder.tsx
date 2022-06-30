import { People } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';
import { Pasient } from '../../../../../fetching/graphql.generated';
import { getBirthday } from '../../../../../utils/sykmeldingUtils';
import { getPasientName } from '../../../../../utils/pasientUtils';

import styles from './SykmeldingenGjelder.module.css';

interface Props {
    pasient?: Pasient | null;
}

function SykmeldingenGjelder({ pasient }: Props): JSX.Element | null {
    if (!pasient) return null;

    const name = getPasientName(pasient);
    if (!name) return null;

    return (
        <div className={styles.sykmeldingenGjelder}>
            <SykmeldtHeading title="Sykmeldingen gjelder" Icon={People} />
            <div className={styles.content}>
                <BodyShort size="small">{name}</BodyShort>
                {pasient.fnr && <BodyShort size="small">Fødselsnr: {getBirthday(pasient.fnr)}</BodyShort>}
            </div>
        </div>
    );
}

export default SykmeldingenGjelder;
