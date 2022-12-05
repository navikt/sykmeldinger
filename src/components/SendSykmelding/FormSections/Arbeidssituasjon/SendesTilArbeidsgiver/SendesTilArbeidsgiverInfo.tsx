import React from 'react'

import SykmeldingArbeidsgiverContainer from '../../../../SykmeldingViews/SykmeldingView/SykmeldingArbeidsgiverContainer'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'

import VeilederSenderSykmeldingenInfo from './VeilederSenderSykmeldingenInfo'

interface Props {
    sykmelding: SykmeldingFragment
}

function SendesTilArbeidsgiverInfo({ sykmelding }: Props): JSX.Element {
    return (
        <div>
            <VeilederSenderSykmeldingenInfo />
            <SykmeldingArbeidsgiverContainer sykmelding={sykmelding} />
        </div>
    )
}

export default SendesTilArbeidsgiverInfo
