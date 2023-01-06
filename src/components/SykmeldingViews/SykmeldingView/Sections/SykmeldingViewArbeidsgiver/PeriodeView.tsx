import { Calender } from '@navikt/ds-icons'

import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode } from '../../../../../fetching/graphql.generated'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { toReadableDatePeriod } from '../../../../../utils/dateUtils'

import styles from './PeriodeView.module.css'

interface PeriodeViewProps {
    perioder: Periode[]
}

function PeriodeView({ perioder }: PeriodeViewProps): JSX.Element {
    return (
        <div className="periodeView">
            <SykmeldtHeading title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} />
            <div className={styles.perioder}>
                {perioder.map((periode, index) => (
                    <div key={index} className={styles.periode}>
                        <SykmeldingEntry
                            title={getPeriodTitle(periode)}
                            mainText={toReadableDatePeriod(periode.fom, periode.tom)}
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
        </div>
    )
}

export default PeriodeView
