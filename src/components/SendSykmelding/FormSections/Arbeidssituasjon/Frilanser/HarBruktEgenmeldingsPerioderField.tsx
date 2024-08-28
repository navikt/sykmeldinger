import { ReactElement } from 'react'
import { BodyShort, ReadMore } from '@navikt/ds-react'

import { sporsmal } from '../../../../../utils/sporsmal'
import YesNoField from '../../../../FormComponents/YesNoField/YesNoField'
import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { FormValues } from '../../../SendSykmeldingForm'

interface Props {
    oppfolgingsdato: string
}

function HarBruktEgenmeldingsPerioderField({ oppfolgingsdato }: Props): ReactElement {
    return (
        <QuestionWrapper>
            <YesNoField<FormValues>
                name="harBruktEgenmelding"
                legend={sporsmal.harBruktEgenmelding(oppfolgingsdato)}
                subtext={<HarBruktEgenmeldingReadMore />}
                rules={{
                    required: 'Du må svare på om du har brukt egenmelding eller annen sykmelding før du ble syk.',
                }}
            />
        </QuestionWrapper>
    )
}

function HarBruktEgenmeldingReadMore(): ReactElement {
    return (
        <ReadMore header="Hva betyr dette?">
            <BodyShort spacing>Vi trenger denne informasjonen for å vite hvem som skal utbetale hva.</BodyShort>
            <BodyShort spacing>
                Siden vi ikke får tak i informasjonen automatisk, må vi få disse opplysningene fra deg.
            </BodyShort>
        </ReadMore>
    )
}

export default HarBruktEgenmeldingsPerioderField
