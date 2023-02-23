import { Calender } from '@navikt/ds-icons'
import { BodyShort, Heading } from '@navikt/ds-react'

import { getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode } from '../../../../../fetching/graphql.generated'
import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { toReadableDate, toReadableDatePeriod } from '../../../../../utils/dateUtils'
import { getPublicEnv } from '../../../../../utils/env'

import styles from './Perioder.module.css'

interface Props {
    perioder: Periode[]
    isV3: boolean
    egenmeldingsdager?: string | undefined
}

const publicEnv = getPublicEnv()

function Perioder({ perioder, isV3, egenmeldingsdager }: Props): JSX.Element {
    return (
        <div>
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
                            <JaEntry
                                title={
                                    isV3
                                        ? 'Pasienten kan være delvis i arbeid ved bruk av reisetilskudd'
                                        : 'Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?'
                                }
                            />
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
    egenmeldingsdager: string
}

function Egenmeldingsdager({ egenmeldingsdager }: EgenmeldingsdagerProps): JSX.Element {
    return (
        <div className={styles.egenmeldingsdager}>
            <Heading size="xsmall" level="4">
                Egenmeldingsdager (lagt til av deg)
            </Heading>
            <ul>
                {JSON.parse(egenmeldingsdager)
                    .sort()
                    .map((date: string) => (
                        <li className={styles.date} key={toReadableDate(date)}>
                            <BodyShort size="small">{toReadableDate(date)}</BodyShort>
                        </li>
                    ))}
                <BodyShort size="small" as="li">{`(${egenmeldingsdager.length} dager)`}</BodyShort>
            </ul>
        </div>
    )
}

export default Perioder
