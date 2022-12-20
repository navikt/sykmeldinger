import React from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import { Information } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { UtenlandskSykmelding } from '../../../../../utils/utenlanskUtils'

import styles from './AnnenInfo.module.css'

interface Props {
    sykmelding: UtenlandskSykmelding
}

function AnnenInfo({ sykmelding }: Props): JSX.Element {
    return (
        <div>
            <SykmeldtHeading title="Annen info" Icon={Information} />
            <div className={styles.annenInfo}>
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
                    <BodyShort size="small">{sykmelding.utenlandskSykmelding.land}</BodyShort>
                </div>
                {sykmelding.medisinskVurdering?.hovedDiagnose?.tekst && (
                    <div className={styles.info}>
                        <Heading className={styles.heading} size="small" level="4">
                            Diagnose
                        </Heading>
                        <BodyShort size="small">{sykmelding.medisinskVurdering.hovedDiagnose.tekst}</BodyShort>
                    </div>
                )}
                {sykmelding.medisinskVurdering?.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return (
                            <div className={styles.info} key={index}>
                                <Heading className={styles.heading} size="small" level="4">
                                    Bidiagnose
                                </Heading>
                                <BodyShort size="small">{bidiagnose.tekst}</BodyShort>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default AnnenInfo
