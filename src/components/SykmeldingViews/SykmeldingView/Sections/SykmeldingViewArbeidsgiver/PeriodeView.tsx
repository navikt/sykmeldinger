import { Calender } from '@navikt/ds-icons'
import { BodyShort, Heading } from '@navikt/ds-react'

import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { getEgenmeldingsdagerLength, getPeriodTitle, getReadableLength } from '../../../../../utils/periodeUtils'
import { Periode } from '../../../../../fetching/graphql.generated'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { toReadableDate, toReadableDatePeriod } from '../../../../../utils/dateUtils'
import { getPublicEnv } from '../../../../../utils/env'
import {
    EgenmeldingsperioderAnsatt,
    egenmeldingsperioderAnsattMock,
} from '../../../../../server/graphql/mockData/egenmeldingMock'

import styles from './PeriodeView.module.css'

interface PeriodeViewProps {
    perioder: Periode[]
}

const publicEnv = getPublicEnv()

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
            {publicEnv.DISPLAY_EGENMELDING === 'true' &&
                egenmeldingsperioderAnsattMock &&
                egenmeldingsperioderAnsattMock.length > 0 && (
                    <Egenmeldingsperioder egenmeldingsperioder={egenmeldingsperioderAnsattMock} />
                )}
        </div>
    )
}

interface EgenmeldingsperioderProps {
    egenmeldingsperioder: EgenmeldingsperioderAnsatt[]
}

function Egenmeldingsperioder({ egenmeldingsperioder }: EgenmeldingsperioderProps): JSX.Element {
    return (
        <div className={styles.egenmeldingsperioder}>
            <Heading size="xsmall" level="4">
                Egenmeldingsdager (oppgitt av den sykmeldte)
            </Heading>
            <ul>
                {egenmeldingsperioder
                    .flatMap((dates: EgenmeldingsperioderAnsatt) => dates.datoer)
                    .map((date: string) => (
                        <li className={styles.date} key={toReadableDate(date)}>
                            <BodyShort size="small">{toReadableDate(date)}</BodyShort>
                        </li>
                    ))}
                <BodyShort size="small" as="li">{`(${getEgenmeldingsdagerLength(
                    egenmeldingsperioder,
                )} dager)`}</BodyShort>
            </ul>
        </div>
    )
}

export default PeriodeView
