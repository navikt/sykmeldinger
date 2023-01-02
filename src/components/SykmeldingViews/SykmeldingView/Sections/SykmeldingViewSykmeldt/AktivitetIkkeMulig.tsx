import { Office2 } from '@navikt/ds-icons'

import { AktivitetIkkeMuligPeriode } from '../../../../../fetching/graphql.generated'
import { arbeidsrelatertArsakToText, medisinskArsakToText } from '../../../../../utils/periodeUtils'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import ListEntry from '../../Layout/ListEntry/ListEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

import styles from './AktivitetIkkeMulig.module.css'

interface Props {
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
    isV3: boolean
}

const AktivitetIkkeMulig = ({ aktivitetIkkeMulig, isV3 }: Props): JSX.Element | null => {
    if (!aktivitetIkkeMulig.medisinskArsak && !aktivitetIkkeMulig.arbeidsrelatertArsak) {
        return null
    }

    return (
        <div>
            <SykmeldtHeading title="Aktivitet på arbeidsplassen" Icon={Office2} />
            {!!aktivitetIkkeMulig.medisinskArsak && (
                <div className={styles.medisinskArsak}>
                    {aktivitetIkkeMulig.medisinskArsak?.arsak && (
                        <ListEntry
                            listTitle="Medisinske årsaker hindrer arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.medisinskArsak.arsak.map((it) =>
                                medisinskArsakToText(it, isV3),
                            )}
                            headingLevel="4"
                        />
                    )}
                    {aktivitetIkkeMulig.medisinskArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                            headingLevel="4"
                        />
                    )}
                </div>
            )}
            {!!aktivitetIkkeMulig.arbeidsrelatertArsak && (
                <div className={styles.arbeidsrelatertArsak}>
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak && (
                        <ListEntry
                            listTitle="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
                            listText={aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(arbeidsrelatertArsakToText)}
                            headingLevel="4"
                        />
                    )}
                    {aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse && (
                        <SykmeldingEntry
                            title="Beskrivelse"
                            mainText={aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                            headingLevel="4"
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default AktivitetIkkeMulig
