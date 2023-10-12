import { ReactElement } from 'react'
import { PersonIcon } from '@navikt/aksel-icons'
import { BodyShort } from '@navikt/ds-react'

import { SykmeldingGroup } from '../../../../molecules/sykmelding/SykmeldingGroup'
import { Pasient } from '../../../../../fetching/graphql.generated'
import { getPasientName } from '../../../../../utils/pasientUtils'

interface Props {
    pasient?: Pasient | null
    parentId: string
}

function SykmeldingenGjelderView({ pasient, parentId }: Props): ReactElement | null {
    if (!pasient) return null

    const name = getPasientName(pasient)
    if (!name) return null

    return (
        <SykmeldingGroup parentId={parentId} heading="Sykmeldingen gjelder" Icon={PersonIcon}>
            <div className="pl-4">
                <BodyShort>{name}</BodyShort>
                {pasient.fnr && <BodyShort>Fødselsnr: {pasient.fnr}</BodyShort>}
            </div>
        </SykmeldingGroup>
    )
}

export default SykmeldingenGjelderView
