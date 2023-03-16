import React from 'react'
import Link from 'next/link'
import { Button } from '@navikt/ds-react'

import { isEgenmeldingsdagerEnabled } from '../../../../../utils/env'

function RedigerEgenmeldingsdagerLink({
    sykmeldingId,
    hasEgenmeldingsdager,
}: {
    sykmeldingId: string
    hasEgenmeldingsdager: boolean
}): JSX.Element | null {
    if (!isEgenmeldingsdagerEnabled()) return null

    return (
        <Link passHref href={`/${sykmeldingId}/endre-egenmeldingsdager`} legacyBehavior>
            <Button as="a" variant="secondary" className="mt-4">
                {hasEgenmeldingsdager ? 'Endre' : 'Legg til'} egenmeldingsdager
            </Button>
        </Link>
    )
}

export default RedigerEgenmeldingsdagerLink
