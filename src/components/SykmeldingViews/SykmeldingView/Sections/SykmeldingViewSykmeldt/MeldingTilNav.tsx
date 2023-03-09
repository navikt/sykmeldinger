import { PeopleDialogOutline } from '@navikt/ds-icons'

import { MeldingTilNav } from '../../../../../fetching/graphql.generated'
import JaEntry from '../../Layout/JaEntry/JaEntry'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'
import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'

interface Props {
    meldingTilNav?: MeldingTilNav | null
}

function MeldingTilNav({ meldingTilNav }: Props): JSX.Element | null {
    if (!meldingTilNav || (meldingTilNav.bistandUmiddelbart === false && !meldingTilNav.beskrivBistand)) {
        return null
    }

    return (
        <div>
            <SykmeldtHeading title="Melding til NAV" Icon={PeopleDialogOutline} />
            {meldingTilNav.bistandUmiddelbart && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <JaEntry title="Ønskes bistand fra NAV nå?" />
                </div>
            )}
            {meldingTilNav.beskrivBistand && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry title="Nærmere beskrivelse" mainText={meldingTilNav.beskrivBistand} small />
                </div>
            )}
        </div>
    )
}

export default MeldingTilNav
