import { Calender } from '@navikt/ds-icons'
import { BodyShort, Heading } from '@navikt/ds-react'

import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode, SvarUnion_DagerSvar_Fragment } from '../../../../../fetching/graphql.generated'
import { SykmeldingSectionHeading } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { toReadableDate, toReadableDatePeriod } from '../../../../../utils/dateUtils'
import { getPublicEnv } from '../../../../../utils/env'

import styles from './PeriodeView.module.css'

interface PeriodeViewProps {
    perioder: Periode[]
    egenmeldingsdager?: SvarUnion_DagerSvar_Fragment | undefined
}

const publicEnv = getPublicEnv()

function PeriodeView({ perioder, egenmeldingsdager }: PeriodeViewProps): JSX.Element {
    return (
        <div className="periodeView">
            <SykmeldingSectionHeading title="Perioder (f.o.m. - t.o.m.)" Icon={Calender} />
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
            {publicEnv.DISPLAY_EGENMELDING === 'true' && egenmeldingsdager && (
                <Egenmeldingsdager egenmeldingsdager={egenmeldingsdager} />
            )}
        </div>
    )
}

interface EgenmeldingsdagerProps {
    egenmeldingsdager: SvarUnion_DagerSvar_Fragment
}

function Egenmeldingsdager({ egenmeldingsdager }: EgenmeldingsdagerProps): JSX.Element {
    return (
        <div className={styles.egenmeldingsdager}>
            <Heading size="xsmall" level="4">
                Egenmeldingsdager (oppgitt av den sykmeldte)
            </Heading>
            <ul>
                {[...egenmeldingsdager.dager].sort().map((date: string) => (
                    <li className={styles.date} key={toReadableDate(date)}>
                        <BodyShort size="small">{toReadableDate(date)}</BodyShort>
                    </li>
                ))}
                <BodyShort size="small" as="li">{`(${egenmeldingsdager.dager.length} dager)`}</BodyShort>
            </ul>
        </div>
    )
}

export default PeriodeView
