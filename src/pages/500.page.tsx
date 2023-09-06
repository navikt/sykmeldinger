import { BodyShort, GuidePanel, Heading, Link } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import PageWrapper from '../components/PageWrapper/PageWrapper'

const NotFoundPage = (): ReactElement => {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent feil' }])

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

export default NotFoundPage
