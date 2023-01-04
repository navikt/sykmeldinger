import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Alert, ReadMore } from '@navikt/ds-react'

import { QuestionWrapper } from '../../shared/FormStructure'
import { NaermesteLederFragment, YesOrNo } from '../../../../../fetching/graphql.generated'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import YesNoField from '../../shared/YesNoField'
import { FormValues } from '../../../SendSykmeldingForm'

import styles from './ArbeidsgiverRiktigNarmesteLederField.module.css'

interface Props {
    narmesteLeder: NaermesteLederFragment
}

function ArbeidsgiverRiktigNarmesteLederField({ narmesteLeder }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()

    const riktigNarmesteLeder = watch('riktigNarmesteLeder')

    return (
        <QuestionWrapper>
            <YesNoField
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
                onChange={(value) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'åpen sykmelding',
                            spørsmål: 'Er det rett nærmeste leder som skal følge deg opp?',
                            svar: value,
                        },
                    })
                }}
            />
            {riktigNarmesteLeder != null && (
                <Alert className={styles.narmestelederInfo} variant="info" role="alert" aria-live="polite">
                    {riktigNarmesteLeder === YesOrNo.YES
                        ? `Vi sender sykmeldingen til ${narmesteLeder.navn}, som finner den ved å logge inn på nav.no`
                        : 'Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'}
                </Alert>
            )}
        </QuestionWrapper>
    )
}

export default ArbeidsgiverRiktigNarmesteLederField
