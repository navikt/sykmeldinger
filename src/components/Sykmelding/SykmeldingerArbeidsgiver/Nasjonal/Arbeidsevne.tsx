import { ReactElement } from 'react'
import { HandshakeIcon } from '@navikt/aksel-icons'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface ArbeidsevneViewProps {
    tiltakArbeidsplassen?: string | null
    parentId: string
}

function Arbeidsevne({ tiltakArbeidsplassen, parentId }: ArbeidsevneViewProps): ReactElement | null {
    if (!tiltakArbeidsplassen) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Hva skal til for å bedre arbeidsevnen?" Icon={HandshakeIcon}>
            <SykmeldingInfo heading="Tilrettelegging/hensyn som bør tas på arbeidsplassen">
                {tiltakArbeidsplassen}
            </SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default Arbeidsevne
