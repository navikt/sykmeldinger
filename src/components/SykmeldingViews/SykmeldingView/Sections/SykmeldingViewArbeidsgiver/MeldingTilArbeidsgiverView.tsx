import { Employer } from '@navikt/ds-icons';

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';

import styles from './MeldingTilArbeidsgiverView.module.css';

interface Props {
    meldingTilArbeidsgiver?: string | null;
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver }: Props): JSX.Element | null {
    if (!meldingTilArbeidsgiver) return null;

    return (
        <div>
            <SykmeldtHeading title="Melding til arbeidsgiver" Icon={Employer} />
            <div className={styles.info}>
                <SykmeldingEntry
                    title="Andre innspill til arbeidsgiver"
                    mainText={meldingTilArbeidsgiver}
                    headingLevel="4"
                />
            </div>
        </div>
    );
}

export default MeldingTilArbeidsgiver;
