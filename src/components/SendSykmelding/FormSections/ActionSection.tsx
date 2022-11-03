import React from 'react'
import { Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'

import { FormValues } from '../SendSykmeldingForm'
import { ArbeidssituasjonType, SendSykmeldingMutation } from '../../../fetching/graphql.generated'

import { getTrengerNySykmelding } from './shared/sykmeldingUtils'

interface Props {
    sendResult: MutationResult<SendSykmeldingMutation>
}

function ActionSection({ sendResult }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()

    const erArbeidstaker = watch('arbeidssituasjon') === ArbeidssituasjonType.Arbeidstaker
    const trengerNySykmelding = getTrengerNySykmelding(watch('uriktigeOpplysninger'))

    if (trengerNySykmelding) {
        return <AvbrytSykmelding />
    }

    return (
        <div>
            <Button variant="primary" type="submit" loading={sendResult.loading}>
                {erArbeidstaker ? 'Send' : 'Bekreft'} sykmelding
            </Button>
            {sendResult.error && <div>error handling here</div>}
        </div>
    )
}

function AvbrytSykmelding(): JSX.Element {
    return (
        <div>
            <Button variant="danger" type="submit">
                TODO avbryt
            </Button>
        </div>
    )
}

export default ActionSection
