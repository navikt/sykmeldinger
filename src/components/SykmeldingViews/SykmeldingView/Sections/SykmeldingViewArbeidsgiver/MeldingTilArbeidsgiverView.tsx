import { PersonSuitIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    meldingTilArbeidsgiver?: string | null
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver }: Props): ReactElement | null {
    if (!meldingTilArbeidsgiver) return null

    return (
        <SykmeldingGroup heading="Melding til arbeidsgiver" Icon={PersonSuitIcon}>
            <SykmeldingInfo heading="Andre innspill til arbeidsgiver">{meldingTilArbeidsgiver}</SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default MeldingTilArbeidsgiver
