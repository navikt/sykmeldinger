import { AktivitetIkkeMuligPeriode } from '../../../../../fetching/graphql.generated';
import ListEntry from '../../Layout/ListEntry/ListEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { arbeidsrelatertArsakToText } from '../../../../../utils/periodeUtils';

import styles from './AktivitetIkkeMuligView.module.css';

interface AktivitetIkkeMuligViewProps {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode;
}

const AktivitetIkkeMuligView = ({ aktivitetIkkeMulig }: AktivitetIkkeMuligViewProps): JSX.Element | null => {
    if (!aktivitetIkkeMulig.arbeidsrelatertArsak) return null;

    return (
        <div className={styles.aktivitetIkkeMulig}>
            {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                <div className={styles.aarsak}>
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                        <ListEntry
                            listTitle="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}
                        />
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            headingLevel="4"
                            mainText={aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                            small
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AktivitetIkkeMuligView;
