import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { Alert, ReadMore } from '@navikt/ds-react'

import { NaermesteLederFragment, YesOrNo } from 'queries'

import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import YesNoField from '../../../../FormComponents/YesNoField/YesNoField'
import { FormValues } from '../../../SendSykmeldingForm'

interface Props {
    narmesteLeder: NaermesteLederFragment
}

function ArbeidsgiverRiktigNarmesteLederField({ narmesteLeder }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()

    const riktigNarmesteLeder = watch('riktigNarmesteLeder')

    return (
        <QuestionWrapper>
            <YesNoField<FormValues>
                name="riktigNarmesteLeder"
                legend={sporsmal.riktigNarmesteLeder(narmesteLeder.navn)}
                subtext={
                    <ReadMore header="Les om hva det innebærer">
                        Den vi spør om, vil få se sykmeldingen din og kan bli kontaktet av NAV underveis i sykefraværet.
                        Hør med arbeidsgiveren din hvis du mener det er en annen de skulle meldt inn i stedet.
                    </ReadMore>
                }
                rules={{
                    required: 'Du må svare på om dette er nærmeste lederen som skal følge deg opp.',
                }}
            />
            {riktigNarmesteLeder != null && (
                <Alert className="my-8" variant="info" aria-live="polite">
                    {riktigNarmesteLeder === YesOrNo.YES
                        ? `Vi sender sykmeldingen til ${narmesteLeder.navn}, som finner den ved å logge inn på nav.no`
                        : 'Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'}
                </Alert>
            )}
        </QuestionWrapper>
    )
}

export default ArbeidsgiverRiktigNarmesteLederField
