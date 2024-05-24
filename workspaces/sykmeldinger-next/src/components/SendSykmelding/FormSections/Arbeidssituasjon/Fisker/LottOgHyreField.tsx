import React, { ReactElement } from 'react'
import { BodyShort, Radio, RadioGroup, ReadMore, Link as AkselLink } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { ArbeidssituasjonType } from 'queries'

import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { FormValues } from '../../../SendSykmeldingForm'

function LottOgHyreField(): ReactElement {
    const { field, fieldState } = useController<FormValues>({
        name: 'fisker.lottOgHyre',
        rules: { required: 'Du må svare på lott eller hyre spørsmål' },
    })

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmal.fisker.lottEllerHyre}
                onChange={(value: ArbeidssituasjonType) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'arbeidsgiver',
                            spørsmål: sporsmal.fisker.velgBlad,
                            svar: value,
                        },
                    })
                    field.onChange(value)
                }}
                error={fieldState.error?.message}
            >
                <ReadMore header="Hva betyr lott og hyre?">
                    <BodyShort spacing>
                        Hvis du mottar lott, regnes du som{' '}
                        <AkselLink href="https://www.nav.no/sykepenger#selvstendig">
                            selvstendig næringsdrivende
                        </AkselLink>
                        .
                    </BodyShort>
                    <BodyShort spacing>
                        Hvis du er på hyre, regnes du som{' '}
                        <AkselLink href="https://www.nav.no/sykepenger#arbeidstaker">arbeidstaker</AkselLink>.
                    </BodyShort>
                    <BodyShort spacing>
                        Hvis du både mottar lott og er på hyre, beregnes sykepengene på grunnlag av begge disse. Les mer
                        under avsnittet hvis du har{' '}
                        <AkselLink href="https://www.nav.no/sykepenger#fa-flere-jobber">flere jobber</AkselLink>.
                    </BodyShort>
                </ReadMore>
                <Radio value="LOTT">Lott</Radio>
                <Radio value="HYRE">Hyre</Radio>
                <Radio value="BEGGE">Både lott og hyre</Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default LottOgHyreField
