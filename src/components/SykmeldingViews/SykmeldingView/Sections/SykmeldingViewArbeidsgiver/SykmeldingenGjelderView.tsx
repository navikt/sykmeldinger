import { People } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { Pasient } from '../../../../../fetching/graphql.generated'
import { getPasientName } from '../../../../../utils/pasientUtils'

interface Props {
    pasient?: Pasient | null
}

function SykmeldingenGjelderView({ pasient }: Props): JSX.Element | null {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <SykmeldingGroup heading="Sykmeldingen gjelder" Icon={People}>
            <div className="pl-4">
                <BodyShort>{name}</BodyShort>
                {pasient.fnr && <BodyShort>Fødselsnr: {pasient.fnr}</BodyShort>}
            </div>
        </SykmeldingGroup>
    )
}

export default SykmeldingenGjelderView
