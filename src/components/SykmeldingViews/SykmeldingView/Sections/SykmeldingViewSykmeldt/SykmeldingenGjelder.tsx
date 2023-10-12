import { ReactElement } from 'react'
import { PersonIcon } from '@navikt/aksel-icons'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { Pasient } from '../../../../../fetching/graphql.generated'
import { getPasientName } from '../../../../../utils/pasientUtils'
import { SykmeldingMultilineInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

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
            <SykmeldingMultilineInfo lines={[name, `Fødselsnr: ${pasient.fnr}`]} variant="gray" />
        </SykmeldingGroup>
    )
}

export default SykmeldingenGjelder
