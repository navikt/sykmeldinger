import { ReactElement } from 'react'
import { Back } from '@navikt/ds-icons'
import { BodyShort, Link } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

function TilHovedsiden(): ReactElement {
    return (
        <Link href={browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT} className="mt-8">
            <Back role="img" aria-hidden />
            <BodyShort>Til hovedsiden ditt sykefravær</BodyShort>
        </Link>
    )
}

export default TilHovedsiden
