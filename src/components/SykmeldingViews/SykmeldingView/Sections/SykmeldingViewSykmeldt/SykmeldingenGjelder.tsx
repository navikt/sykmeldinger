import { People } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'

import { SykmeldingSectionHeading } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { Pasient } from '../../../../../fetching/graphql.generated'
import { getPasientName } from '../../../../../utils/pasientUtils'

interface Props {
    pasient?: Pasient | null
}

function SykmeldingenGjelder({ pasient }: Props): JSX.Element | null {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <div className="mb-4">
            <SykmeldingSectionHeading title="Sykmeldingen gjelder" Icon={People} />
            <div className="mb-3 rounded bg-gray-50 p-4">
                <BodyShort size="small">{name}</BodyShort>
                {pasient.fnr && <BodyShort size="small">Fødselsnr: {pasient.fnr}</BodyShort>}
            </div>
        </div>
    )
}

export default SykmeldingenGjelder
