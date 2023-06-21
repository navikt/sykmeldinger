import { logger } from '@navikt/next-logger'
import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react'
import React, { ReactElement, useEffect } from 'react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import PageWrapper from '../components/PageWrapper/PageWrapper'

const NotFoundPage = (): ReactElement => {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent side' }])

    useEffect(() => {
        logger.warn(`404: ${window.location.pathname}`)
    }, [])

    return (
        <PageWrapper>
            <GuidePanel poster className="mt-8">
                <Heading level="2" size="small" spacing>
                    Oisann! Du har kommet til en side som ikke eksisterer
                </Heading>
                <BodyShort>
                    Dersom du har kommet hit via en lenke, kan du gå tilbake. Fint om du sier i fra til oss hvor du fant
                    denne lenken på{' '}
                    <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        skjemaet for feil og mangler
                    </Link>
                    .
                </BodyShort>
            </GuidePanel>
        </PageWrapper>
    )
}

export default NotFoundPage
