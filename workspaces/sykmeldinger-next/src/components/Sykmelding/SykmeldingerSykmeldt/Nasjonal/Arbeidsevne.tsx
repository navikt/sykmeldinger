import { ReactElement } from 'react'
import { HandshakeIcon } from '@navikt/aksel-icons'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    tiltakArbeidsplassen?: string | null
    tiltakNAV?: string | null
    andreTiltak?: string | null
    parentId: string
}

function Arbeidsevne({ tiltakArbeidsplassen, tiltakNAV, andreTiltak, parentId }: Props): ReactElement | null {
    if (!tiltakArbeidsplassen && !tiltakNAV && !andreTiltak) {
        return null
    }

    return (
        <SykmeldingGroup parentId={parentId} heading="Hva skal til for å bedre arbeidsevnen?" Icon={HandshakeIcon}>
            {tiltakArbeidsplassen != null && (
                <SykmeldingInfo heading="Tilrettelegging/hensyn som bør tas på arbeidsplassen" variant="gray">
                    {tiltakArbeidsplassen}
                </SykmeldingInfo>
            )}
            {tiltakNAV != null && (
                <SykmeldingInfo heading="Tiltak i regi av NAV" variant="gray">
                    {tiltakNAV}
                </SykmeldingInfo>
            )}
            {andreTiltak != null && (
                <SykmeldingInfo heading="Andre innspill til NAV" variant="gray">
                    {andreTiltak}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default Arbeidsevne
