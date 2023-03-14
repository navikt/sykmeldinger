import { Employer } from '@navikt/ds-icons'

import { SykmeldingSectionHeading } from '../../../../molecules/sykmelding/SykmeldingGroup'
import SykmeldingEntry from '../../Layout/SykmeldingEntry/SykmeldingEntry'

interface Props {
    meldingTilArbeidsgiver?: string | null
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver }: Props): JSX.Element | null {
    if (!meldingTilArbeidsgiver) return null

    return (
        <div>
            <SykmeldingSectionHeading title="Melding til arbeidsgiver" Icon={Employer} />
            <div className="mb-3 rounded bg-gray-50 p-4">
                <SykmeldingEntry title="Andre innspill til arbeidsgiver" mainText={meldingTilArbeidsgiver} />
            </div>
        </div>
    )
}

export default MeldingTilArbeidsgiver
