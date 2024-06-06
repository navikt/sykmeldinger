import { ReactElement } from 'react'
import { ChevronLeftIcon } from '@navikt/aksel-icons'
import { BodyShort, Link } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

function TilHovedsiden(): ReactElement {
    return (
        <Link href={browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT} className="mt-8">
            <ChevronLeftIcon role="img" aria-hidden />
            <BodyShort>Til hovedsiden Ditt sykefravær</BodyShort>
        </Link>
    )
}

export default TilHovedsiden
