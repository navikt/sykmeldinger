import { ReactElement } from 'react'
import { PersonChatIcon } from '@navikt/aksel-icons'

import type { MeldingTilNav } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingJaInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    meldingTilNav?: MeldingTilNav | null
    parentId: string
}

function MeldingTilNav({ meldingTilNav, parentId }: Props): ReactElement | null {
    if (meldingTilNav == null || (!meldingTilNav.bistandUmiddelbart && meldingTilNav.beskrivBistand == null)) {
        return null
    }

    return (
        <SykmeldingGroup parentId={parentId} heading="Melding til NAV" Icon={PersonChatIcon}>
            {meldingTilNav.bistandUmiddelbart && (
                <SykmeldingJaInfo heading="Ønskes bistand fra NAV nå?" variant="gray" />
            )}
            {meldingTilNav.beskrivBistand && (
                <SykmeldingInfo heading="Nærmere beskrivelse" variant="gray">
                    {meldingTilNav.beskrivBistand}
                </SykmeldingInfo>
            )}
        </SykmeldingGroup>
    )
}

export default MeldingTilNav
