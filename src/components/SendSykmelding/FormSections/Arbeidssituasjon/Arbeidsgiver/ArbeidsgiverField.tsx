import { Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import { ArbeidssituasjonType, BrukerinformasjonFragment } from 'queries'

import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { FormValues } from '../../../SendSykmeldingForm'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

export const missingAgError = 'For å sende inn sykmeldingen må du fylle ut hvilken arbeidsforhold du er sykmeldt fra.'

function ArbeidsgiverField({ arbeidsgivere }: Props): ReactElement | null {
    const { field, fieldState } = useController<FormValues>({
        name: 'arbeidsgiverOrgnummer',
        rules: {
            validate: (value) => {
                if (!value && arbeidsgivere.length === 0) {
                    return missingAgError
                } else if (!value) {
                    return 'Du må svare på hvilket arbeid du er sykmeldt fra.'
                }
                return
            },
        },
    })

    if (arbeidsgivere.length === 0) return null

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmal.arbeidsgiverOrgnummer}
                onChange={(value: ArbeidssituasjonType) => {
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
