import React from 'react'
import { BodyShort, Label, ReadMore } from '@navikt/ds-react'

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
                subtext={<HarBruktEgenmeldingReadMore />}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding eller annen sykmelding før du ble syk.',
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

function HarBruktEgenmeldingReadMore(): JSX.Element {
    return (
        <ReadMore header="Hva betyr dette?">
            <BodyShort spacing>Vi trenger denne informasjonen for å vite hvem som skal utbetale hva.</BodyShort>
            <BodyShort spacing>
                Siden vi ikke får tak i informasjonen automatisk, må vi få disse opplysningene fra deg.
            </BodyShort>
            <Label spacing>Med fravær mener vi</Label>
            <ul>
                <li>
                    <BodyShort>egenmelding</BodyShort>
                </li>
                <li>
                    <BodyShort>papirsykmelding</BodyShort>
                </li>
                <li>
                    <BodyShort>ferie</BodyShort>
                </li>
                <li>
                    <BodyShort>permisjon</BodyShort>
                </li>
                <li>
                    <BodyShort>sykmelding fra et annet arbeidsforhold i samme bedrift</BodyShort>
                </li>
            </ul>
        </ReadMore>
    )
}

export default HarBruktEgenmeldingField
