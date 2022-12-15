import { BodyShort, Heading } from '@navikt/ds-react'
import { Information } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

import styles from './AnnenInfoView.module.css'

interface Props {
    sykmelding: SykmeldingFragment
}

function AnnenInfoView({ sykmelding }: Props): JSX.Element {
    return (
        <div>
            <SykmeldtHeading title="Annen info" Icon={Information} />
            <div className={styles.info}>
                <Heading className={styles.heading} size="small" level="4">
                    Dato sykmeldingen ble skrevet
                </Heading>
                <BodyShort size="small">{toReadableDate(sykmelding.behandletTidspunkt)}</BodyShort>
            </div>
            <div className={styles.info}>
                <Heading className={styles.heading} size="small" level="4">
                    Landet sykmeldingen ble skrevet
                </Heading>
                <BodyShort size="small">{sykmelding.utenlandskSykmelding?.land}</BodyShort>
            </div>
            <div className={styles.diagnoser}>
                {sykmelding.medisinskVurdering?.hovedDiagnose?.tekst && (
                    <SykmeldingEntry
                        title="Diagnose"
                        mainText={sykmelding.medisinskVurdering?.hovedDiagnose?.tekst}
                        sladd
                    />
                )}
                {sykmelding.medisinskVurdering?.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} sladd />
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default AnnenInfoView
