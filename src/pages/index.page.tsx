import { PropsWithChildren, ReactElement } from 'react'
import { Accordion, Alert, BodyShort, Heading, Link, LinkPanel, Skeleton } from '@navikt/ds-react'
import Head from 'next/head'
import { groupBy, range } from 'remeda'
import { logger } from '@navikt/next-logger'

import useSykmeldinger from '../hooks/useSykmeldinger'
import useHotjarTrigger from '../hooks/useHotjarTrigger'
import InfoOmDigitalSykmelding from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding'
import { isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils'
import SykmeldingLinkPanel from '../components/SykmeldingLinkPanel/SykmeldingLinkPanel'
import Header from '../components/Header/Header'
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden'
import { withAuthenticatedPage } from '../auth/withAuthentication'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { SykmeldingFragment } from '../fetching/graphql.generated'
import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import useFocusRefetch from '../hooks/useFocusRefetch'

function SykmeldingerPage(): ReactElement {
    useHotjarTrigger('SYKMELDING_LISTEVISNING')

    const { data, error, loading, refetch } = useSykmeldinger()

    useFocusRefetch(refetch)

    if (data?.sykmeldinger == null && loading) {
        return (
            <IndexWrapper>
                <SykmeldingerListSkeleton />
            </IndexWrapper>
        )
    }

    if (error) {
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </IndexWrapper>
        )
    }
    if (data?.sykmeldinger == null) {
        logger.error('Sykmeldinger is undefined')
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </IndexWrapper>
        )
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger)

    return (
        <IndexWrapper>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <Accordion>
                <InfoOmDigitalSykmelding />
                <SerIkkeSykmelding />
            </Accordion>

            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </IndexWrapper>
    )
}

function SerIkkeSykmelding(): ReactElement {
    return (
        <Accordion.Item>
            <Accordion.Header>Ser du ikke sykmeldingen din her?</Accordion.Header>
            <Accordion.Content>
                <LinkPanel
                    href="https://person.nav.no/mine-saker/tema/SYM"
                    target="_blank"
                    border
                    className="mb-8 mt-4 rounded-large"
                >
                    <LinkPanel.Title className="text-heading-xsmall">Sjekk dokumentlisten</LinkPanel.Title>
                </LinkPanel>

                <div className="mb-4">
                    <BodyShort>
                        Det kan også bety at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du{' '}
                        <Link
                            href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer"
                            target="_blank"
                        >
                            papirsykmeldingen
                        </Link>{' '}
                        i stedet.
                    </BodyShort>
                </div>

                <div className="mb-4">
                    <BodyShort>
                        <Link href="https://www.nav.no/kontaktoss" target="_blank">
                            Kontakt oss
                        </Link>{' '}
                        om du fortsatt ikke finner det du leter etter.
                    </BodyShort>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    )
}

function IndexWrapper({ children }: PropsWithChildren): ReactElement {
    useUpdateBreadcrumbs(() => [])

    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                {children}
                <div className="mt-16">
                    <TilHovedsiden />
                </div>
            </PageWrapper>
        </>
    )
}

function SykmeldingerListSkeleton(): ReactElement {
    return (
        <section aria-labelledby="sykmeldinger-list-skeleton">
            <Heading size="small" level="2" hidden id="sykmeldinger-list-skeleton">
                Henter dine sykmeldinger
            </Heading>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2" />
            <SingleSykmeldingSkeleton />
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                <SingleSykmeldingSkeleton />
                <SingleSykmeldingSkeleton />
            </div>
            <Skeleton variant="text" height="var(--a-font-size-heading-xlarge)" width="40%" className="mb-2 mt-16" />
            <div className="flex flex-col gap-4">
                {range(0, 10).map((index) => (
                    <SingleSykmeldingSkeleton key={index} />
                ))}
            </div>
        </section>
    )
}

function SingleSykmeldingSkeleton(): ReactElement {
    return (
        <div className="flex rounded border border-border-subtle p-6 max-[560px]:flex-col">
            <div className="mr-8 max-[560px]:hidden">
                <Skeleton variant="circle" width="48px" height="48px" />
            </div>
            <div className="grow">
                <Skeleton width="29%" />
                <Skeleton width="20%" height="2rem" />
                <Skeleton width="49%" />
            </div>
            <div className="mr-16 mt-2 flex items-center">
                <Skeleton width="120px" />
            </div>
        </div>
    )
}

type SykmeldingSections = {
    apenSykmeldinger: SykmeldingFragment[]
    pastSykmeldinger: SykmeldingFragment[]
    underBehandling: SykmeldingFragment[]
}

const groupByPredicate = (sykmelding: SykmeldingFragment): keyof SykmeldingSections => {
    if (isUnderbehandling(sykmelding)) return 'underBehandling'
    else if (isActiveSykmelding(sykmelding)) return 'apenSykmeldinger'
    else return 'pastSykmeldinger'
}

function filterSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]): SykmeldingSections {
    const grouped: Record<keyof SykmeldingSections, SykmeldingFragment[]> = groupBy(sykmeldinger, groupByPredicate)

    return {
        apenSykmeldinger: grouped.apenSykmeldinger ?? [],
        pastSykmeldinger: grouped.pastSykmeldinger ?? [],
        underBehandling: grouped.underBehandling ?? [],
    }
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingerPage
