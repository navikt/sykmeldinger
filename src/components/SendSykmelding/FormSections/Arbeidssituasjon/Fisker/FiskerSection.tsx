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
 * Blad B+LOTT = selvstending næringsdrivende flyt UTEN forsikringsspørsmål
 *
 * Blad A+HYRE = arbeidstaker - vanlig flyt → if (ingenArbeidsgiver) → selvstending flyt MED forsikringsspørsmål
 * Blad B+HYRE = arbeidstaker - vanlig flyt → if (ingenArbeidsgiver) → selvstending flyt UTEN forsikringsspørsmål
 * Blad A+BEGGE = arbeidstaker - vanlig flyt → if (ingenArbeidsgiver) → selvstending flyt MED forsikringsspørsmål
 * Blad B+BEGGE = arbeidstaker - vanlig flyt → if (ingenArbeidsgiver) → selvstending flyt UTEN forsikringsspørsmål
 *
 * SAMT dersom bruker ikke ser sin arbeidsgiver i listen, så skal brukeren få lov å gå inn i korrespenderende
 * selvstendig flyt med tilhørende logikk basert på Blad.
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
            {lottOgHyre === 'LOTT' && <FiskerSelvstendigSection sykmelding={sykmelding} askForsikring={blad === 'A'} />}
            {(lottOgHyre === 'HYRE' || lottOgHyre === 'BEGGE') && (
                <FiskerArbeidstakerSection sykmelding={sykmelding} brukerinformasjon={brukerinformasjon} />
            )}
        </SectionWrapper>
    )
}

export default FiskerSection
