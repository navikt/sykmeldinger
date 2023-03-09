import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Alert, GuidePanel } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

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

function SykmeldingkvitteringPage(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam()
    const { data, error, loading } = useSykmeldingById(sykmeldingId)
    const router = useRouter()

    useHotjarTrigger(getHotjarType(data?.sykmelding))

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
        data.sykmelding.behandlingsutfall.status === RegelStatus.INVALID ||
        ![StatusEvent.SENDT, StatusEvent.BEKREFTET].includes(data.sykmelding.sykmeldingStatus.statusEvent)
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
                <SykmeldingSykmeldtContainer sykmelding={data.sykmelding} editableEgenmelding />
            </div>

            {data.sykmelding.sykmeldingStatus.statusEvent === 'SENDT' && (
                <SykmeldingArbeidsgiverContainer sykmelding={data.sykmelding} />
            )}

            <HintToNextOlderSykmelding />
        </KvitteringWrapper>
    )
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
