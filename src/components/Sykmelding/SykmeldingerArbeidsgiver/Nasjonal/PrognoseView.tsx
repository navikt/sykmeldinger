import { ReactElement } from 'react'
import { ClockDashedIcon } from '@navikt/aksel-icons'

import { Prognose } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingJaInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    prognose?: Prognose | null
    parentId: string
}

function PrognoseView({ prognose, parentId }: Props): ReactElement | null {
    if (prognose == null || (!prognose.arbeidsforEtterPeriode && !prognose.hensynArbeidsplassen)) {
        return null
    }

    return (
        <SykmeldingGroup parentId={parentId} heading="Prognose" Icon={ClockDashedIcon}>
            {prognose.arbeidsforEtterPeriode && (
                <SykmeldingJaInfo heading="Er pasienten 100% arbeidsfør etter denne perioden?" />
            )}
            {prognose.hensynArbeidsplassen != null && (
                <SykmeldingInfo heading="Hensyn som må tas på arbeidsplassen">
                    {prognose.hensynArbeidsplassen}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default PrognoseView
