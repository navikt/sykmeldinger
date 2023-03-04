import { Back } from '@navikt/ds-icons'
import { BodyShort, Link } from '@navikt/ds-react'

import { getPublicEnv } from '../../utils/env'

const publicEnv = getPublicEnv()

function TilHovedsiden(): JSX.Element {
    return (
        <Link href={publicEnv.SYKEFRAVAER_ROOT} className="mt-8">
            <Back role="img" aria-hidden />
            <BodyShort>Til hovedsiden ditt sykefravær</BodyShort>
        </Link>
    )
}

export default TilHovedsiden
