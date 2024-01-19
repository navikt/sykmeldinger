import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { SykmeldingFragment } from 'queries'

import SykmeldingArbeidsgiverExpansionCard from '../../../../Sykmelding/SykmeldingerArbeidsgiver/SykmeldingArbeidsgiverExpansionCard'
import { FormValues } from '../../../SendSykmeldingForm'
import { toDateString } from '../../../../../utils/dateUtils'
import { notNull } from '../../../../../utils/ts-utils'

import VeilederSenderSykmeldingenInfo from './VeilederSenderSykmeldingenInfo'

interface Props {
    sykmelding: SykmeldingFragment
}

function SendesTilArbeidsgiverInfo({ sykmelding }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()

    const chosenEgenmeldingsdager: string[] | undefined =
        watch('egenmeldingsdager')
            ?.flatMap((it) => it.datoer)
            ?.filter(notNull)
            .map(toDateString) ?? undefined

    return (
        <div>
            <VeilederSenderSykmeldingenInfo />
            <SykmeldingArbeidsgiverExpansionCard
                sykmelding={sykmelding}
                chosenEgenmeldingsdager={chosenEgenmeldingsdager}
            />
        </div>
    )
}

export default SendesTilArbeidsgiverInfo
