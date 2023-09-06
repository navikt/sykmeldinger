import { ReactElement } from 'react'
import { People } from '@navikt/ds-icons'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { Pasient } from '../../../../../fetching/graphql.generated'
import { getPasientName } from '../../../../../utils/pasientUtils'
import { SykmeldingMultilineInfo } from '../../../../molecules/sykmelding/SykmeldingInfo'

interface Props {
    pasient?: Pasient | null
}

function SykmeldingenGjelder({ pasient }: Props): ReactElement | null {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <SykmeldingGroup heading="Sykmeldingen gjelder" Icon={People}>
            <SykmeldingMultilineInfo lines={[name, `Fødselsnr: ${pasient.fnr}`]} variant="gray" />
        </SykmeldingGroup>
    )
}

export default SykmeldingenGjelder
