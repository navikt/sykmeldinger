import { PersonSuitIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    meldingTilArbeidsgiver?: string | null
    parentId: string
}

function MeldingTilArbeidsgiver({ meldingTilArbeidsgiver, parentId }: Props): ReactElement | null {
    if (!meldingTilArbeidsgiver) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Melding til arbeidsgiver" Icon={PersonSuitIcon}>
            <SykmeldingInfo heading="Andre innspill til arbeidsgiver" variant="gray">
                {meldingTilArbeidsgiver}
            </SykmeldingInfo>
        </SykmeldingGroup>
    )
}

export default MeldingTilArbeidsgiver
