import React, { PropsWithChildren } from 'react';
import { Alert, GuidePanel } from '@navikt/ds-react';
import Head from 'next/head';

import Spinner from '../../components/Spinner/Spinner';
import useSykmelding from '../../hooks/useSykmelding';
import { logger } from '../../utils/logger';
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../utils/sykmeldingUtils';
import useFindOlderSykmeldingId from '../../hooks/useFindOlderSykmeldingId';
import OkBekreftetSykmelding from '../../components/SykmeldingViews/OK/BEKREFTET/OkBekreftetSykmelding';
import OkAvbruttSykmelding from '../../components/SykmeldingViews/OK/AVBRUTT/OkAvbruttSykmelding';
import OkSendtSykmelding from '../../components/SykmeldingViews/OK/SENDT/OkSendtSykmelding';
import OkUtgattSykmelding from '../../components/SykmeldingViews/OK/UTGATT/OkUtgattSykmelding';
import OkApenSykmelding from '../../components/SykmeldingViews/OK/APEN/OkApenSykmelding';
import InvalidApenSykmelding from '../../components/SykmeldingViews/INVALID/APEN/InvalidApenSykmelding';
import InvalidBekreftetSykmelding from '../../components/SykmeldingViews/INVALID/BEKREFTET/InvalidBekreftetSykmelding';
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam';
import Header from '../../components/Header/Header';
import Brodsmuler from '../../components/Breadcrumbs/Breadcrumbs';
import Spacing from '../../components/Spacing/Spacing';
import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden';
import { withAuthenticatedPage } from '../../auth/withAuthentication';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { Sykmelding } from '../../fetching/graphql.generated';
import NavLogoRedSvg from '../../components/SykmeldingViews/SykmeldingView/Svg/NavLogoRedSvg';

import styles from './index.module.css';

function SykmeldingPage(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam();

    const { data, error, loading } = useSykmelding(sykmeldingId);
    const olderSykmelding = useFindOlderSykmeldingId(data?.sykmelding);

    if (loading || olderSykmelding.isLoading) {
        return (
            <Spacing>
                <Spinner headline="Henter sykmelding" />
            </Spacing>
        );
    }

    if (error || olderSykmelding.error) {
        return (
            <SykmeldingerWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </SykmeldingerWrapper>
        );
    }

    if (data?.sykmelding === undefined) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`);
        return (
            <SykmeldingerWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </SykmeldingerWrapper>
        );
    }

    return (
        <SykmeldingerWrapper sykmelding={data?.sykmelding}>
            <SykmeldingComponent
                sykmelding={data?.sykmelding}
                olderSykmeldingId={olderSykmelding.earliestSykmeldingId}
                olderSykmeldingCount={olderSykmelding.olderSykmeldingCount}
            />
        </SykmeldingerWrapper>
    );
}

const SykmeldingComponent = ({
    sykmelding,
    olderSykmeldingId,
    olderSykmeldingCount,
}: {
    sykmelding: Sykmelding;
    olderSykmeldingId: string | null;
    olderSykmeldingCount: number;
}): JSX.Element | null => {
    const behandlingsutfall = sykmelding.behandlingsutfall.status;
    const status = sykmelding.sykmeldingStatus.statusEvent;

    switch (behandlingsutfall) {
        case 'OK':
        case 'MANUAL_PROCESSING':
            switch (status) {
                case 'APEN':
                    return (
                        <OkApenSykmelding
                            sykmelding={sykmelding}
                            olderSykmeldingId={olderSykmeldingId}
                            olderSykmeldingCount={olderSykmeldingCount}
                        />
                    );
                case 'BEKREFTET':
                    return <OkBekreftetSykmelding sykmelding={sykmelding} />;
                case 'SENDT':
                    return <OkSendtSykmelding sykmelding={sykmelding} />;
                case 'AVBRUTT':
                    return <OkAvbruttSykmelding sykmelding={sykmelding} />;
                case 'UTGATT':
                    return <OkUtgattSykmelding sykmelding={sykmelding} />;
                default:
                    logger.error(`${behandlingsutfall} sykmelding with unsupported status: ${status}`);
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>;
            }
        case 'INVALID':
            switch (status) {
                case 'APEN':
                    return <InvalidApenSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <InvalidBekreftetSykmelding sykmelding={sykmelding} />;
                default:
                    logger.error(`Avvist sykmelding with unsupported status: ${status}`);
                    return <GuidePanel>Oisann! Det har oppstått en feil i baksystemene.</GuidePanel>;
            }
    }

    return null;
};

function SykmeldingerWrapper({ sykmelding, children }: PropsWithChildren<{ sykmelding?: Sykmelding }>): JSX.Element {
    return (
        <>
            <Head>
                <title>Sykmelding - www.nav.no</title>
            </Head>
            <div className={styles.logoForPrint}>
                <NavLogoRedSvg />
            </div>
            <Header
                title={sykmelding ? getSykmeldingTitle(sykmelding) : undefined}
                subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding) : undefined}
            />
            <PageWrapper>
                <Brodsmuler
                    breadcrumbs={[
                        { title: 'Sykmeldinger', path: '/' },
                        { title: sykmelding ? getSykmeldingTitle(sykmelding) : 'Sykmelding' },
                    ]}
                />
                {children}
                <Spacing direction="top" amount="large">
                    <TilHovedsiden />
                </Spacing>
            </PageWrapper>
        </>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default SykmeldingPage;
