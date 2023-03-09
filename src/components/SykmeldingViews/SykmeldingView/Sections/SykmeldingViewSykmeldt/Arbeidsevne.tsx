import { ShakeHands } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

interface Props {
    tiltakArbeidsplassen?: string | null
    tiltakNAV?: string | null
    andreTiltak?: string | null
}

function Arbeidsevne({ tiltakArbeidsplassen, tiltakNAV, andreTiltak }: Props): JSX.Element | null {
    if (!tiltakArbeidsplassen && !tiltakNAV && !andreTiltak) {
        return null
    }

    return (
        <div>
            <SykmeldtHeading title="Hva skal til for å bedre arbeidsevnen?" Icon={ShakeHands} />
            {!!tiltakArbeidsplassen && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry
                        title="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                        mainText={tiltakArbeidsplassen}
                    />
                </div>
            )}
            {!!tiltakNAV && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry title="Tiltak i regi av NAV" mainText={tiltakNAV} />
                </div>
            )}
            {!!andreTiltak && (
                <div className="mb-3 rounded bg-gray-50 p-4">
                    <SykmeldingEntry title="Andre innspill til NAV" mainText={andreTiltak} />
                </div>
            )}
        </div>
    )
}

export default Arbeidsevne
