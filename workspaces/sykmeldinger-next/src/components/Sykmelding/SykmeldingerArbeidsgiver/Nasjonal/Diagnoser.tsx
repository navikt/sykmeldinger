import { BandageIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'

import { MedisinskVurdering } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { SykmeldingSladd } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    medisinskVurdering: MedisinskVurdering
    parentId: string
}

function Diagnoser({ medisinskVurdering, parentId }: Props): ReactElement {
    return (
        <SykmeldingGroup parentId={parentId} heading="Medisinsk tilstand" Icon={BandageIcon} tight>
            {medisinskVurdering.hovedDiagnose?.tekst && <SykmeldingSladd heading="Diagnose" />}
        </SykmeldingGroup>
    )
}

export default Diagnoser
