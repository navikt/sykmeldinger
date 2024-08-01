'use client'

import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react'
import { ReactElement, useEffect } from 'react'
import { logger } from '@navikt/next-logger'

import { useUpdateBreadcrumbs } from '../breadcrumbs/useBreadcrumbs'
import PageWrapper from '../components/PageWrapper/PageWrapper'

type Props = { error: Error & { digest?: string } }

const ErrorPage = ({ error }: Props): ReactElement => {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent feil' }])

    useEffect(() => {
        logger.error('Error boundary hit (error.ts)')
        logger.error(error)
    }, [error])

    return (
        <PageWrapper>
            <GuidePanel poster className="mt-8">
                <Heading level="2" size="small" spacing>
                    En ukjent feil har oppstått
                </Heading>
                <BodyShort>
                    Dersom feilen fortsetter, er det fint om du sier i fra til oss på{' '}
                    <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        skjemaet for feil og mangler
                    </Link>
                    .
                </BodyShort>
            </GuidePanel>
        </PageWrapper>
    )
}

export default ErrorPage
