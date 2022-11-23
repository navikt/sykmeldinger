import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Alert, GuidePanel } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

import useSykmeldinger from '../../hooks/useSykmelding'
import Spacing from '../../components/Spacing/Spacing'
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

function SykmeldingkvitteringPage(): JSX.Element {
    useHotjarTrigger('SYKMELDING_KVITTERING')
    const sykmeldingId = useGetSykmeldingIdParam()

    const { data, error, loading } = useSykmeldinger(sykmeldingId)

    if (loading) {
        return <Spinner headline="Laster kvittering" />
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
        data.sykmelding.behandlingsutfall.status === RegelStatus.Invalid ||
        ![StatusEvent.Sendt, StatusEvent.Bekreftet].includes(data.sykmelding.sykmeldingStatus.statusEvent)
    ) {
        logger.error(
            `Trying to display kvittering for sykmelding with id: ${sykmeldingId}, but the status is wrong, sykmeldingstatus: ${data.sykmelding.sykmeldingStatus.statusEvent}, behandlingsutfall: ${data.sykmelding.behandlingsutfall.status}`,
        )
        return (
            <KvitteringWrapper>
                <GuidePanel poster>
                    Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt
                    med oss hvis det ikke har løst seg til i morgen.
                </GuidePanel>
            </KvitteringWrapper>
        )
    }

    return (
        <KvitteringWrapper sykmelding={data.sykmelding}>
            <Spacing>
                <StatusBanner
                    sykmeldingStatus={data.sykmelding.sykmeldingStatus}
                    behandlingsutfall={data.sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <StatusInfo
                    sykmeldingStatus={data.sykmelding.sykmeldingStatus}
                    sykmeldingsperioder={data.sykmelding.sykmeldingsperioder}
                    sykmeldingMerknader={data.sykmelding.merknader ?? []}
                />
            </Spacing>

            <Spacing>
                <UxSignalsWidget />
            </Spacing>

            <Spacing>
                <SykmeldingSykmeldtContainer sykmelding={data.sykmelding} />
            </Spacing>

            {data.sykmelding.sykmeldingStatus.statusEvent === 'SENDT' && (
                <SykmeldingArbeidsgiverContainer sykmelding={data.sykmelding} />
            )}

            <HintToNextOlderSykmelding />
        </KvitteringWrapper>
    )
}

function KvitteringWrapper({
    sykmelding,
    children,
}: PropsWithChildren<{ sykmelding?: SykmeldingFragment }>): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam()
    useUpdateBreadcrumbs(() => createKvitteringBreadcrumbs(sykmeldingId, sykmelding), [sykmeldingId, sykmelding])

    return (
        <>
            <Head>
                <title>Kvittering - www.nav.no</title>
            </Head>
            <Header
                title={sykmelding ? getSykmeldingTitle(sykmelding) : undefined}
                subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding) : undefined}
            />
            <PageWrapper>{children}</PageWrapper>
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingkvitteringPage
