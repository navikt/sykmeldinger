import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { getPeriodTitle, getReadableLength, getReadablePeriod } from '../../../../../utils/periodeUtils';
import { Periode } from '../../../../../fetching/graphql.generated';

import styles from './PeriodeView.module.css';

interface PeriodeViewProps {
    perioder: Periode[];
}

function PeriodeView({ perioder }: PeriodeViewProps): JSX.Element {
    return (
        <div className={styles.periodeView}>
            {perioder.map((periode, index) => (
                <div key={index} className={styles.periode}>
                    <SykmeldingEntry
                        title={getPeriodTitle(periode)}
                        mainText={getReadablePeriod(periode)}
                        subText={getReadableLength(periode)}
                    />
                    {!!periode.innspillTilArbeidsgiver && (
                        <SykmeldingEntry
                            title="Innspill til arbeidsgiver om tilrettelegging"
                            mainText={periode.innspillTilArbeidsgiver}
                            small
                        />
                    )}
                    {periode.gradert?.reisetilskudd && (
                        <JaEntry title="Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default PeriodeView;