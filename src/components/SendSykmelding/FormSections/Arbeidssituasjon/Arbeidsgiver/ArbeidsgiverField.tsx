import { Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { ArbeidssituasjonType, BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { sporsmal } from '../../../../../utils/sporsmal'
import { FormValues } from '../../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function ArbeidsgiverField({ arbeidsgivere }: Props): ReactElement {
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
                legend={sporsmal.arbeidsgiverOrgnummer}
                onChange={(value: ArbeidssituasjonType) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'arbeidsgiver',
                            spørsmål: sporsmal.arbeidsgiverOrgnummer,
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
                    <Radio
                        key={arbeidsgiver.orgnummer}
                        value={arbeidsgiver.orgnummer}
                        className="overflow-anywhere"
                        description={`org.nr: ${arbeidsgiver.orgnummer}`}
                    >
                        {arbeidsgiver.navn}
                    </Radio>
                ))}
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default ArbeidsgiverField
