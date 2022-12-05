import React from 'react'

import { sporsmolOgSvar } from '../../../../../utils/sporsmolOgSvar'
import YesNoField from '../../shared/YesNoField'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { QuestionWrapper } from '../../shared/FormStructure'

interface Props {
    oppfolgingsdato: string
}

function HarBruktEgenmeldingField({ oppfolgingsdato }: Props): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name="harBruktEgenmelding"
                legend={sporsmolOgSvar.harBruktEgenmelding.sporsmaltekst(oppfolgingsdato)}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding eller annen sykmelding før du ble syk',
                }}
                onChange={(value) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'åpen sykmelding',
                            spørsmål: sporsmolOgSvar.harBruktEgenmelding.sporsmaltekst(oppfolgingsdato),
                            svar: value,
                        },
                    })
                }}
            />
        </QuestionWrapper>
    )
}

export default HarBruktEgenmeldingField
