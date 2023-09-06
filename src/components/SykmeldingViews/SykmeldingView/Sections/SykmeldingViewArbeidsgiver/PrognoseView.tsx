import { ReactElement } from 'react'
import { Historic } from '@navikt/ds-icons'

import { Prognose } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingJaInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    prognose?: Prognose | null
}

function PrognoseView({ prognose }: Props): ReactElement | null {
    if (prognose == null || (!prognose.arbeidsforEtterPeriode && !prognose.hensynArbeidsplassen)) {
        return null
    }

    return (
        <SykmeldingGroup heading="Prognose" Icon={Historic}>
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
