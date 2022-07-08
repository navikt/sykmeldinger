import { Historic } from '@navikt/ds-icons';

import { Prognose } from '../../../../../fetching/graphql.generated';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './PrognoseView.module.css';

interface Props {
    prognose?: Prognose | null;
}

function PrognoseView({ prognose }: Props): JSX.Element | null {
    if (!prognose) {
        return null;
    }

    if (!prognose.arbeidsforEtterPeriode && !prognose.hensynArbeidsplassen) {
        return null;
    }

    return (
        <div>
            <SykmeldtHeading title="Prognose" Icon={Historic} />
            {prognose.arbeidsforEtterPeriode && (
                <div className={styles.arbeidsforEtterPeriode}>
                    <JaEntry title="Er pasienten 100% arbeidsfør etter denne perioden?" />
                </div>
            )}
            {!!prognose.hensynArbeidsplassen && (
                <div className={styles.hensynArbeidsplassen}>
                    <SykmeldingEntry
                        title="Hensyn som må tas på arbeidsplassen"
                        mainText={prognose.hensynArbeidsplassen}
                        small
                    />
                </div>
            )}
        </div>
    );
}

export default PrognoseView;
