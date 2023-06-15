'use client'

import React, { ReactElement, useEffect } from 'react'
import { Alert, BodyShort, Heading, Link as DsLink } from '@navikt/ds-react'
import Link from 'next/link'
import { logger } from '@navikt/next-logger'

function ErrorPage({ error, reset }: { error: Error; reset: () => void }): ReactElement {
    useEffect(() => {
        logger.error(error)
    }, [error])

    return (
        <Alert variant="error">
            <Heading spacing size="small" level="3">
                Det skjedde en feil ved lasting av sykmeldingene dine.
            </Heading>
            <BodyShort spacing>
                Du kan prøve å{' '}
                <Link href="" onClick={reset}>
                    laste sykmeldingene på nytt
                </Link>{' '}
                for å se om det løser problemet.
            </BodyShort>
            <BodyShort spacing>
                Dersom problemet vedvarer, kan du fortelle oss om feilen på{' '}
                <DsLink href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                    skjemaet for feil og mangler
                </DsLink>
                .
            </BodyShort>
        </Alert>
    )
}

export default ErrorPage
