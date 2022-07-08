import { ShakeHands } from '@navikt/ds-icons';

import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './ArbeidsevneView.module.css';

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string | null;
}

const ArbeidsevneView: React.FC<ArbeidsevneViewProps> = ({ tiltakArbeidsplassen }) => {
    if (!tiltakArbeidsplassen) return null;

    return (
        <div>
            <SykmeldtHeading title="Hva skal til for å bedre arbeidsevnen?" Icon={ShakeHands} />
            <div className={styles.arbeidsevne}>
                <SykmeldingEntry
                    title="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                    mainText={tiltakArbeidsplassen}
                    headingLevel="4"
                />
            </div>
        </div>
    );
};

export default ArbeidsevneView;
