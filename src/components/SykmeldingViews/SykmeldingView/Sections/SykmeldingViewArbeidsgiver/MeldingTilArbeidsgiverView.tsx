import { Employer } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

interface Props {
    meldingTilArbeidsgiver?: string | null
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver }: Props): JSX.Element | null {
    if (!meldingTilArbeidsgiver) return null

    return (
        <div>
            <SykmeldtHeading title="Melding til arbeidsgiver" Icon={Employer} />
            <div className="p-4">
                <SykmeldingEntry title="Andre innspill til arbeidsgiver" mainText={meldingTilArbeidsgiver} />
            </div>
        </div>
    )
}

export default MeldingTilArbeidsgiver
