import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Alert } from '@navikt/ds-react'

import { QuestionWrapper } from '../../shared/FormStructure'
import { NaermesteLederFragment, YesOrNo } from '../../../../../fetching/graphql.generated'
import { sporsmolOgSvar } from '../../../../../utils/sporsmolOgSvar'
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
                legend={sporsmolOgSvar.riktigNarmesteLeder.sporsmalstekst(narmesteLeder.navn)}
                rules={{
                    required: 'Du må svare på om dette er nærmeste lederen som skal følge deg opp',
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
            {riktigNarmesteLeder === YesOrNo.YES && (
                <Alert className={styles.riktigNarmesteLederInfo} variant="info" role="alert" aria-live="polite">
                    Vi sender sykmeldingen til {narmesteLeder.navn}, som finner den ved å logge inn på nav.no
                </Alert>
            )}
        </QuestionWrapper>
    )
}

export default ArbeidsgiverRiktigNarmesteLederField
