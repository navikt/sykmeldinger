import { Calender } from '@navikt/ds-icons';

import {
    getPeriodTitle,
    getReadableLength,
    getReadablePeriod,
    Periode,
} from '../../../../../models/Sykmelding/Periode';
import JaEntry from '../../Layout/JaEntry/JaEntry';
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry';
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading';

import styles from './Perioder.module.css';

interface Props {
    perioder: Periode[];
}

function Perioder({ perioder }: Props): JSX.Element {
    return (
        <>
            <SykmeldtHeading title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} />
            <div className={styles.perioder}>
                {perioder.map((periode, index) => (
                    <div key={index} className={styles.periode}>
                        <SykmeldingEntry
                            title={getPeriodTitle(periode)}
                            mainText={getReadablePeriod(periode)}
                            subText={getReadableLength(periode)}
                            headingLevel="4"
                        />
                        {!!periode.innspillTilArbeidsgiver && (
                            <SykmeldingEntry
                                title="Innspill til arbeidsgiver om tilrettelegging"
                                mainText={periode.innspillTilArbeidsgiver}
                                small
                                headingLevel="4"
                            />
                        )}
                        {periode.gradert?.reisetilskudd && (
                            <JaEntry
                                title="Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?"
                                headingLevel="4"
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Perioder;
