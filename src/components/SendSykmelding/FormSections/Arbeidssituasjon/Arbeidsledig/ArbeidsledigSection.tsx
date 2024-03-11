import React, { ReactElement } from 'react'
import { Alert, BodyShort, Heading, Radio, RadioGroup, Link as DsLink } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { Arbeidsgiver, ArbeidssituasjonType, SykmeldingFragment } from 'queries'

import { QuestionWrapper, SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { FormValues } from '../../../SendSykmeldingForm'
import { useFindRelevantArbeidsgivere } from '../../../../../hooks/useFindRelevantArbeidsgivere'
import Spinner from '../../../../Spinner/Spinner'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinfoArbeidsgivere: readonly Arbeidsgiver[]
}

function ArbeidsledigSection({ sykmelding, brukerinfoArbeidsgivere }: Props): ReactElement | null {
    const { field, fieldState } = useController<FormValues>({
        name: 'arbeidsgiverOrgnummer',
        rules: { required: 'Du må svare på hvilket arbeid du har blitt arbeidsledig fra.' },
    })

    const { arbeidsgivere, error, isLoading } = useFindRelevantArbeidsgivere(sykmelding, brukerinfoArbeidsgivere)

    if (isLoading) return <Spinner headline="Laster arbeidsgivere" />
    if (error)
        return (
            <Alert className="mt-6" variant="error">
                <Heading spacing size="small" level="3">
                    Det skjedde en feil ved lasting av arbeidsgivere.
                </Heading>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du fortelle oss om feilen på{' '}
                    <DsLink
                        href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler"
                        target="_blank"
                    >
                        skjemaet for feil og mangler
                    </DsLink>
                </BodyShort>
            </Alert>
        )
    if (!arbeidsgivere?.length) return null

    return (
        <SectionWrapper>
            <QuestionWrapper>
                <RadioGroup
                    {...field}
                    id={field.name}
                    legend={sporsmal.arbeidsledigFra}
                    onChange={(value: ArbeidssituasjonType) => {
                        logAmplitudeEvent({
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: 'endret arbeidssituasjon',
                                spørsmål: sporsmal.arbeidsledigFra,
                                svar: value,
                            },
                        })
                        field.onChange(value)
                    }}
                    error={fieldState.error?.message}
                >
                    {arbeidsgivere.map((arbeidsgiver) => (
                        <Radio
                            key={arbeidsgiver?.orgnummer}
                            value={arbeidsgiver?.orgnummer}
                            className="overflow-anywhere"
                            description={`org.nr: ${arbeidsgiver?.orgnummer}`}
                        >
                            {arbeidsgiver?.navn}
                        </Radio>
                    ))}
                </RadioGroup>
            </QuestionWrapper>
        </SectionWrapper>
    )
}

export default ArbeidsledigSection
