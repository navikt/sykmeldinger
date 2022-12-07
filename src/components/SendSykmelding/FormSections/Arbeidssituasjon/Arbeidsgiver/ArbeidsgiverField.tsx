import { Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import React from 'react'
import { useController } from 'react-hook-form'

import { QuestionWrapper } from '../../shared/FormStructure'
import { ArbeidssituasjonType, BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { sporsmolOgSvar } from '../../../../../utils/sporsmolOgSvar'
import { FormValues } from '../../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function ArbeidsgiverField({ arbeidsgivere }: Props): JSX.Element {
    const { field, fieldState } = useController<FormValues>({
        name: 'arbeidsgiverOrgnummer',
        rules: { required: 'Du må svare på hvilket arbeid du er sykmeldt fra.' },
        shouldUnregister: true,
        defaultValue: null,
    })

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmolOgSvar.arbeidsgiverOrgnummer.sporsmaltekst}
                onChange={(value: ArbeidssituasjonType) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'arbeidsgiver',
                            spørsmål: sporsmolOgSvar.arbeidsgiverOrgnummer.sporsmaltekst,
                            svar: value,
                        },
                    })
                    field.onChange(value)
                }}
                error={fieldState.error?.message}
            >
                {arbeidsgivere.length > 0 && (
                    <ReadMore header="Ser du ikke arbeidsgiveren din her?">
                        Be arbeidsgiveren din om å registrere deg i A-meldingen. Da blir det oppdatert her slik at du
                        kan få sendt den til arbeidsgiveren.
                    </ReadMore>
                )}
                {arbeidsgivere.map((arbeidsgiver) => (
                    <Radio key={arbeidsgiver.orgnummer} value={arbeidsgiver.orgnummer}>
                        {arbeidsgiver.navn} (org.nr: {arbeidsgiver.orgnummer})
                    </Radio>
                ))}
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default ArbeidsgiverField
