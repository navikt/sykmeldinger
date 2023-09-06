import { Employer } from '@navikt/ds-icons'
import { ReactElement } from 'react'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    meldingTilArbeidsgiver?: string | null
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver }: Props): ReactElement | null {
    if (!meldingTilArbeidsgiver) return null

    return (
        <SykmeldingGroup heading="Melding til arbeidsgiver" Icon={Employer}>
            <SykmeldingInfo heading="Andre innspill til arbeidsgiver" variant="gray">
                {meldingTilArbeidsgiver}
            </SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default MeldingTilArbeidsgiver
