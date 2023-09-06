import { ReactElement } from 'react'
import { ShakeHands } from '@navikt/ds-icons'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string | null
}

function ArbeidsevneView({ tiltakArbeidsplassen }: ArbeidsevneViewProps): ReactElement | null {
    if (!tiltakArbeidsplassen) return null

    return (
        <SykmeldingGroup heading="Hva skal til for å bedre arbeidsevnen?" Icon={ShakeHands}>
            <SykmeldingInfo heading="Tilrettelegging/hensyn som bør tas på arbeidsplassen">
                {tiltakArbeidsplassen}
            </SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default ArbeidsevneView
