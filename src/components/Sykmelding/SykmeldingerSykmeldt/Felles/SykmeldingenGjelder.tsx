import { ReactElement } from 'react'
import { PersonIcon } from '@navikt/aksel-icons'

import { Pasient } from 'queries'

import { SykmeldingGroup } from '../../../molecules/sykmelding/SykmeldingGroup'
import { fnrText, getPasientName } from '../../../../utils/pasientUtils'
import { SykmeldingMultilineInfo } from '../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    pasient?: Pasient | null
    parentId: string
}

function SykmeldingenGjelder({ pasient, parentId }: Props): ReactElement | null {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Sykmeldingen gjelder" Icon={PersonIcon}>
            <SykmeldingMultilineInfo lines={[name, fnrText(pasient.fnr)]} variant="gray" />
        </SykmeldingGroup>
    )
}

export default SykmeldingenGjelder
