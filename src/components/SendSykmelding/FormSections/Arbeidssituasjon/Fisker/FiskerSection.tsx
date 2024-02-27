import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import { SectionWrapper } from '../../../../FormComponents/FormStructure'
import { FormValues } from '../../../SendSykmeldingForm'

import BladField from './BladField'
import LottOgHyreField from './LottOgHyreField'
import FiskerArbeidstakerSection from './FiskerArbeidstaker/FiskerArbeidstakerSection'
import FiskerSelvstendigSection from './FiskerSelvstendig/FiskerSelvstendigSection'

type Props = {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
}

/**
 * Fisker-flyt, består av 6 ulike permutasjoner av blad og lott/hyre
 *
 * Blad A+LOTT = selvstending næringsdrivende flyt MED forsikringsspørsmål
 * Blad A+BEGGE = selvstending næringsdrivende flyt MED forsikringsspørsmål
 * Blad B+LOTT = selvstending næringsdrivende flyt UTEN forsikringsspørsmål
 * Blad B+BEGGE = selvstending næringsdrivende flyt UTEN forsikringsspørsmål
 *
 * Blad A+HYRE = arbeidstaker - vanlig flyt
 * Blad B+HYRE = arbeidstaker - vanlig flyt
 *
 * Isteden for at denne logikken er sentralisert i parent-komponenten, så er det
 * løst med komposisjon. Det betyr at alle "leaf-nodes" i state-"treet" har sin egen
 * oppsummering om hva som sendes f.eks til arbeidsgiver.
 */
function FiskerSection({ brukerinformasjon, sykmelding }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const [blad, lottOgHyre] = watch(['fisker.blad', 'fisker.lottOgHyre'])

    return (
        <SectionWrapper>
            <BladField />
            {blad != null && <LottOgHyreField />}
            {(lottOgHyre === 'LOTT' || lottOgHyre === 'BEGGE') && (
                <FiskerSelvstendigSection sykmelding={sykmelding} askForsikring={blad === 'A'} />
            )}
            {lottOgHyre === 'HYRE' && (
                <FiskerArbeidstakerSection sykmelding={sykmelding} brukerinformasjon={brukerinformasjon} />
            )}
        </SectionWrapper>
    )
}

export default FiskerSection
