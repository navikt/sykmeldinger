import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { SykmeldingFragment } from 'queries'

import SykmeldingArbeidsgiverExpansionCard from '../../../../Sykmelding/SykmeldingerArbeidsgiver/SykmeldingArbeidsgiverExpansionCard'
import { FormValues } from '../../../SendSykmeldingForm'
import { toDateString } from '../../../../../utils/dateUtils'
import { notNull } from '../../../../../utils/ts-utils'
import {
    BrukerSvarExpansionCard,
    SporsmaltekstMetadata,
} from '../../../../Sykmelding/SykmeldingerSykmeldt/Felles/BrukerSvar'

import VeilederSenderSykmeldingenInfo from './VeilederSenderSykmeldingenInfo'

interface Props {
    sykmelding: SykmeldingFragment
    metadata: SporsmaltekstMetadata
}

function SendesTilArbeidsgiverInfo({ sykmelding, metadata }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const formValues = watch()

    const chosenEgenmeldingsdager: string[] | undefined =
        formValues.egenmeldingsdager
            ?.flatMap((it) => it.datoer)
            ?.filter(notNull)
            ?.map(toDateString) ?? undefined

    return (
        <div>
            <VeilederSenderSykmeldingenInfo />
            <SykmeldingArbeidsgiverExpansionCard
                sykmelding={sykmelding}
                chosenEgenmeldingsdager={chosenEgenmeldingsdager}
            />
            <BrukerSvarExpansionCard
                title="Oppsummering av dine svar"
                brukerSvar={{
                    values: formValues,
                    sporsmaltekstMetadata: metadata,
                }}
            />
        </div>
    )
}

export default SendesTilArbeidsgiverInfo
