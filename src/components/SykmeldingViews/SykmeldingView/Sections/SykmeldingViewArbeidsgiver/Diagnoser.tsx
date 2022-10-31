import { Bandage } from '@navikt/ds-icons'
import React from 'react'

import { MedisinskVurdering } from '../../../../../fetching/graphql.generated'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'

import styles from './Diagnoser.module.css'

interface Props {
    medisinskVurdering: MedisinskVurdering
    sladd?: boolean
}

function Diagnoser({ medisinskVurdering, sladd }: Props): JSX.Element {
    return (
        <div>
            <SykmeldtHeading title="Medisinsk tilstand" Icon={Bandage} />
            <div className={styles.diagnoser}>
                {medisinskVurdering.hovedDiagnose?.tekst && (
                    <SykmeldingEntry
                        title="Diagnose"
                        mainText={medisinskVurdering?.hovedDiagnose?.tekst}
                        sladd={sladd}
                    />
                )}
                {medisinskVurdering.biDiagnoser.map((bidiagnose, index) => {
                    if (bidiagnose.tekst) {
                        return (
                            <SykmeldingEntry key={index} title="Bidiagnose" mainText={bidiagnose.tekst} sladd={sladd} />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Diagnoser
