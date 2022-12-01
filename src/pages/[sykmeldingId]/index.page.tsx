import React, { PropsWithChildren, useCallback, useState } from 'react'
import { Alert, BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Head from 'next/head'
import { logger } from '@navikt/next-logger'

import Spinner from '../../components/Spinner/Spinner'
import useSykmelding from '../../hooks/useSykmelding'
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../utils/sykmeldingUtils'
import useFindOlderSykmeldingId from '../../hooks/useFindOlderSykmeldingId'
import OkBekreftetSykmelding from '../../components/SykmeldingViews/OK/BEKREFTET/OkBekreftetSykmelding'
import OkAvbruttSykmelding from '../../components/SykmeldingViews/OK/AVBRUTT/OkAvbruttSykmelding'
import OkSendtSykmelding from '../../components/SykmeldingViews/OK/SENDT/OkSendtSykmelding'
import OkUtgattSykmelding from '../../components/SykmeldingViews/OK/UTGATT/OkUtgattSykmelding'
import OkApenSykmelding from '../../components/SykmeldingViews/OK/APEN/OkApenSykmelding'
import InvalidApenSykmelding from '../../components/SykmeldingViews/INVALID/APEN/InvalidApenSykmelding'
import InvalidBekreftetSykmelding from '../../components/SykmeldingViews/INVALID/BEKREFTET/InvalidBekreftetSykmelding'
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam'
import Header from '../../components/Header/Header'
import Spacing from '../../components/Spacing/Spacing'
import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden'
import { withAuthenticatedPage } from '../../auth/withAuthentication'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { Sykmelding } from '../../fetching/graphql.generated'
import { getPublicEnv } from '../../utils/env'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import useFocusRefetch from '../../hooks/useFocusRefetch'

import styles from './index.module.css'

function SykmeldingPage(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam()

    const { data, error, loading, refetch } = useSykmelding(sykmeldingId)
    const olderSykmelding = useFindOlderSykmeldingId(data?.sykmelding)

    useFocusRefetch(refetch)

    if (loading || olderSykmelding.isLoading) {
        return (
            <Spacing>
                <Spinner headline="Henter sykmelding" />
            </Spacing>
        )
    }

    if (error || olderSykmelding.error) {
        return (
            <SykmeldingerWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </SykmeldingerWrapper>
        )
    }

    if (data?.sykmelding === undefined) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`)
        return (
            <SykmeldingerWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </SykmeldingerWrapper>
        )
    }

    return (
        <SykmeldingerWrapper sykmelding={data?.sykmelding}>
            <SykmeldingComponent
                sykmelding={data?.sykmelding}
                olderSykmeldingId={olderSykmelding.earliestSykmeldingId}
                olderSykmeldingCount={olderSykmelding.olderSykmeldingCount}
            />
        </SykmeldingerWrapper>
    )
}

const SykmeldingComponent = ({
    sykmelding,
    olderSykmeldingId,
    olderSykmeldingCount,
}: {
    sykmelding: Sykmelding
    olderSykmeldingId: string | null
    olderSykmeldingCount: number
}): JSX.Element | null => {
    const [hasReopenedSykmelding, setHasReopenedSykmelding] = useState(false)
    const reopen = useCallback(() => {
        setHasReopenedSykmelding(true)
    }, [])

    const behandlingsutfall = sykmelding.behandlingsutfall.status
    const status = sykmelding.sykmeldingStatus.statusEvent

    switch (behandlingsutfall) {
        case 'OK':
        case 'MANUAL_PROCESSING':
            if (hasReopenedSykmelding) {
                return (
                    <OkApenSykmelding
                        sykmelding={sykmelding}
                        olderSykmeldingId={olderSykmeldingId}
                        olderSykmeldingCount={olderSykmeldingCount}
                    />
                )
            }

            switch (status) {
                case 'APEN':
                    return (
                        <OkApenSykmelding
                            sykmelding={sykmelding}
                            olderSykmeldingId={olderSykmeldingId}
                            olderSykmeldingCount={olderSykmeldingCount}
                        />
                    )
                case 'BEKREFTET':
                    return <OkBekreftetSykmelding sykmelding={sykmelding} reopen={reopen} />
                case 'SENDT':
                    return <OkSendtSykmelding sykmelding={sykmelding} />
                case 'AVBRUTT':
                    return <OkAvbruttSykmelding sykmelding={sykmelding} reopen={reopen} />
                case 'UTGATT':
                    return <OkUtgattSykmelding sykmelding={sykmelding} />
                default:
                    logger.error(`${behandlingsutfall} sykmelding with unsupported status: ${status}`)
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>
            }
        case 'INVALID':
            if (hasReopenedSykmelding) {
                return <InvalidApenSykmelding sykmelding={sykmelding} />
            }

            switch (status) {
                case 'APEN':
                    return <InvalidApenSykmelding sykmelding={sykmelding} />
                case 'BEKREFTET':
                    return <InvalidBekreftetSykmelding sykmelding={sykmelding} />
                default:
                    logger.error(`Avvist sykmelding with unsupported status: ${status}`)
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>
            }
    }

    return null
}

function SykmeldingerWrapper({ sykmelding, children }: PropsWithChildren<{ sykmelding?: Sykmelding }>): JSX.Element {
    const publicEnv = getPublicEnv()

    useUpdateBreadcrumbs(() => [{ title: getSykmeldingTitle(sykmelding) }])

    addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p' && sykmelding?.id) {
            e.preventDefault()
            e.stopImmediatePropagation()
            window.open(`${publicEnv.publicPath}/${sykmelding.id}/pdf`, '_ blank')
        }
    })

    return (
        <div id="index-page">
            <div className={styles.browserPrintMessage} hidden>
                <Heading level="1" size="large">
                    Det er ikke mulig å printe på denne måten.
                </Heading>
                <BodyLong>Vennligst bruk printknappen øverst til høyre for sykmeldingen for å printe.</BodyLong>
            </div>
            <div className={styles.hideOnBrowserPrint}>
                <Head>
                    <title>Sykmelding - www.nav.no</title>
                </Head>
                <Header
                    title={sykmelding ? getSykmeldingTitle(sykmelding) : undefined}
                    subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding) : undefined}
                />
                <PageWrapper>
                    {children}
                    <Spacing direction="top" amount="large">
                        <TilHovedsiden />
                    </Spacing>
                </PageWrapper>
            </div>
        </div>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default SykmeldingPage
