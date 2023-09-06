import { ReactElement } from 'react'
import { PeopleDialogOutline } from '@navikt/ds-icons'

import { MeldingTilNav } from '../../../../../fetching/graphql.generated'
import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo, SykmeldingJaInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    meldingTilNav?: MeldingTilNav | null
}

function MeldingTilNav({ meldingTilNav }: Props): ReactElement | null {
    if (meldingTilNav == null || (!meldingTilNav.bistandUmiddelbart && meldingTilNav.beskrivBistand == null)) {
        return null
    }

    return (
        <SykmeldingGroup heading="Melding til NAV" Icon={PeopleDialogOutline}>
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
