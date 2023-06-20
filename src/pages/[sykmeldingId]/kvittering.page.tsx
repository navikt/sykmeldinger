import Head from 'next/head'
import React, { Fragment, PropsWithChildren, ReactElement } from 'react'
import { Alert, BodyShort, GuidePanel, Heading, Link as DsLink, Skeleton } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { range } from 'remeda'

import useSykmeldingById from '../../hooks/useSykmeldingById'
import Spinner from '../../components/Spinner/Spinner'
import StatusBanner from '../../components/StatusBanner/StatusBanner'
import StatusInfo from '../../components/StatusInfo/StatusInfo'
import useHotjarTrigger from '../../hooks/useHotjarTrigger'
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam'
import Header from '../../components/Header/Header'
import { withAuthenticatedPage } from '../../auth/withAuthentication'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../utils/sykmeldingUtils'
import { RegelStatus, StatusEvent, SykmeldingFragment } from '../../fetching/graphql.generated'
import HintToNextOlderSykmelding from '../../components/ForceOrder/HintToNextOlderSykmelding'
import SykmeldingArbeidsgiverContainer from '../../components/SykmeldingViews/SykmeldingView/SykmeldingArbeidsgiverContainer'
import SykmeldingSykmeldtContainer from '../../components/SykmeldingViews/SykmeldingView/SykmeldingSykmeldtContainer'
import { createKvitteringBreadcrumbs, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import UxSignalsWidget from '../../components/UxSignals/UxSignalsWidget'
import { isUtenlandsk } from '../../utils/utenlanskUtils'
import { useFindPrevSykmeldingTom } from '../../hooks/useFindPrevSykmeldingTom'
import { hasHitPreviousSykmeldingTom } from '../../components/FormComponents/Egenmelding/egenmeldingsdagerFieldUtils'

function SykmeldingkvitteringPage(): ReactElement {
    const sykmeldingId = useGetSykmeldingIdParam()
    const { data, error, loading } = useSykmeldingById(sykmeldingId)
    const router = useRouter()

    useHotjarTrigger(getHotjarType(data?.sykmelding))

    if (loading) {
        return (
            <KvitteringWrapper>
                <KvitteringSkeleton />
            </KvitteringWrapper>
        )
    }

    if (error) {
        return (
            <KvitteringWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Sykmeldingen kunne ikke hentes. Prøv igjen senere.
                </Alert>
            </KvitteringWrapper>
        )
    }

    if (data?.sykmelding == null) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`)
        return (
            <KvitteringWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </KvitteringWrapper>
        )
    }

    if (
        data.sykmelding.behandlingsutfall.status === RegelStatus.INVALID ||
        ![StatusEvent.SENDT, StatusEvent.BEKREFTET].includes(data.sykmelding.sykmeldingStatus.statusEvent)
    ) {
        logger.error(
            `Trying to display kvittering for sykmelding with id: ${sykmeldingId}, but the status is wrong, sykmeldingstatus: ${data.sykmelding.sykmeldingStatus.statusEvent}, behandlingsutfall: ${data.sykmelding.behandlingsutfall.status}`,
        )
        return (
            <KvitteringWrapper sykmelding={data.sykmelding}>
                <GuidePanel poster>
                    <Heading size="medium" level="2" spacing>
                        Klarer ikke å vise kvittering
                    </Heading>
                    <BodyShort spacing>
                        Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta
                        kontakt med oss hvis det ikke har løst seg til i morgen.
                    </BodyShort>
                    <BodyShort>
                        Du kan prøve å gå tilbake til
                        <DsLink as={Link} href={`/${sykmeldingId}`}>
                            selve sykmeldingen
                        </DsLink>
                        .
                    </BodyShort>
                </GuidePanel>
            </KvitteringWrapper>
        )
    }

    return (
        <KvitteringWrapper sykmelding={data.sykmelding}>
            <div className="mb-8">
                <StatusBanner
                    sykmeldingStatus={data.sykmelding.sykmeldingStatus}
                    behandlingsutfall={data.sykmelding.behandlingsutfall}
                    isEgenmeldingsKvittering={router.query.egenmelding === 'true'}
                />
            </div>

            <div className="mb-8">
                <StatusInfo
                    sykmeldingStatus={data.sykmelding.sykmeldingStatus}
                    sykmeldingsperioder={data.sykmelding.sykmeldingsperioder}
                    sykmeldingMerknader={data.sykmelding.merknader ?? []}
                />
            </div>

            <div className="mb-8">
                <UxSignalsWidget />
            </div>

            <div className="mb-8">
                <KvitteringSykmeldingSykmeldtContainer sykmelding={data.sykmelding} />
            </div>

            {data.sykmelding.sykmeldingStatus.statusEvent === 'SENDT' && (
                <SykmeldingArbeidsgiverContainer sykmelding={data.sykmelding} />
            )}

            <HintToNextOlderSykmelding />
        </KvitteringWrapper>
    )
}

function KvitteringSykmeldingSykmeldtContainer({ sykmelding }: { sykmelding: SykmeldingFragment }): ReactElement {
    const { previousSykmeldingTom, error, isLoading } = useFindPrevSykmeldingTom(
        sykmelding,
        sykmelding.sykmeldingStatus.arbeidsgiver?.orgnummer,
    )

    const hasHitPrevious = hasHitPreviousSykmeldingTom(sykmelding, previousSykmeldingTom)

    if (isLoading) {
        return <Spinner headline="Henter sykmeldinger..." />
    }

    if (error) {
        return (
            <Alert variant="error">
                <Heading spacing size="small" level="3">
                    Det skjedde en feil ved lasting av sykmeldingene dine.
                </Heading>
                <BodyShort spacing>
                    Du kan prøve å <Link href="">oppfriske</Link> siden for å se om det løser problemet.
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

    return <SykmeldingSykmeldtContainer sykmelding={sykmelding} editableEgenmelding={!hasHitPrevious} />
}

function getHotjarType(
    sykmelding: SykmeldingFragment | null | undefined,
): 'SYKMELDING_KVITTERING' | 'UTENLANDSK_KVITTERING' | null {
    if (sykmelding == null) {
        return null
    }

    return isUtenlandsk(sykmelding) ? 'UTENLANDSK_KVITTERING' : 'SYKMELDING_KVITTERING'
}

function KvitteringWrapper({
    sykmelding,
    children,
}: PropsWithChildren<{ sykmelding?: SykmeldingFragment }>): ReactElement {
    const sykmeldingId = useGetSykmeldingIdParam()
    useUpdateBreadcrumbs(() => createKvitteringBreadcrumbs(sykmeldingId, sykmelding), [sykmeldingId, sykmelding])

    return (
        <>
            <Head>
                <title>Kvittering - www.nav.no</title>
            </Head>
            {sykmelding == null ? (
                <Header skeleton />
            ) : (
                <Header title={getSykmeldingTitle(sykmelding)} subTitle={getReadableSykmeldingLength(sykmelding)} />
            )}
            <PageWrapper>{children}</PageWrapper>
        </>
    )
}

function KvitteringSkeleton(): ReactElement {
    return (
        <section aria-labelledby="sykmelding-loading-skeleton">
            <Heading id="sykmelding-loading-skeleton" size="medium" level="3" hidden>
                Henter kvitteringen
            </Heading>
            <div className="rounded border border-border-subtle p-4">
                <Skeleton width="50%" />
                <Skeleton width="30%" />
            </div>
            <div className="navds-guide-panel navds-guide-panel--poster mb-8 mt-8">
                <Skeleton
                    className="navds-guide !border-none"
                    variant="circle"
                    width="var(--a-spacing-24)"
                    height="var(--a-spacing-24)"
                />
                <div className="border border-border-subtle p-8 [clip-path:polygon(0%_0%,_0%_100%,_calc(50%_-_3rem)_100%,_calc(50%_-_3rem)_0%,_calc(50%_+_3rem)_0%,_calc(50%_+_3rem)_8px,_calc(50%_-_3rem)_8px,_calc(50%_-_3rem)_100%,_100%_100%,_100%_0%)]">
                    <div className="pt-8">
                        <Skeleton />
                        <Skeleton width="30%" />
                        <Skeleton width="15%" className="mt-4" />
                    </div>
                </div>
            </div>
            <Skeleton variant="rectangle" height="10rem" />
            <Skeleton width="50%" height="3rem" className="mt-8" />
            <Skeleton width="40%" />
            {range(0, 8).map((index) => (
                <Fragment key={index}>
                    <Skeleton width="35%" height="3rem" className="mt-8" />
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                </Fragment>
            ))}
        </section>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingkvitteringPage
