import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import SykmeldingArbeidsgiverContainer from '../../../../SykmeldingViews/SykmeldingView/SykmeldingArbeidsgiverContainer'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
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
            <SykmeldingArbeidsgiverContainer
                sykmelding={sykmelding}
                chosenEgenmeldingsdager={chosenEgenmeldingsdager}
            />
        </div>
    )
}

export default SendesTilArbeidsgiverInfo
