import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

import useSykmeldinger from '../../hooks/useSykmelding';
import Spacing from '../../components/Spacing/Spacing';
import Spinner from '../../components/Spinner/Spinner';
import StatusBanner from '../../components/StatusBanner/StatusBanner';
import VeilederMaleSvg from '../../components/Veileder/svg/VeilederMaleSvg';
import StatusInfo from '../../components/StatusInfo/StatusInfo';
import Sykmeldingsopplysninger from '../../components/SykmeldingViews/SykmeldingView/SykmeldingsopplysningerContainer';
import { logger } from '../../utils/logger';
import useHotjarTrigger from '../../hooks/useHotjarTrigger';
import useGetSykmeldingIdParam from '../../hooks/useGetSykmeldingIdParam';
import Header from '../../components/Header/Header';
import Brodsmuler from '../../components/Breadcrumbs/Breadcrumbs';
import TilHovedsiden from '../../components/TilHovedsiden/TilHovedsiden';
import { withAuthenticatedPage } from '../../auth/withAuthentication';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { getReadableSykmeldingLength, getSykmeldingTitle } from '../../utils/sykmeldingUtils';
import { RegelStatus, StatusEvent, SykmeldingFragment } from '../../fetching/graphql.generated';

function SykmeldingkvitteringPage(): JSX.Element {
    useHotjarTrigger('SYKMELDING_KVITTERING');
    const sykmeldingId = useGetSykmeldingIdParam();

    const { data, error, loading } = useSykmeldinger(sykmeldingId);

    if (loading) {
        return <Spinner headline="Laster kvittering" />;
    }

    if (error) {
        return (
            <KvitteringWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    Sykmeldingen kunne ikke hentes. Prøv igjen senere.
                </AlertStripeAdvarsel>
            </KvitteringWrapper>
        );
    }

    if (data?.sykmelding == null) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`);
        return (
            <KvitteringWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </KvitteringWrapper>
        );
    }

    if (
        data.sykmelding.behandlingsutfall.status === RegelStatus.Invalid ||
        ![StatusEvent.Sendt, StatusEvent.Bekreftet].includes(data.sykmelding.sykmeldingStatus.statusEvent)
    ) {
        logger.error(
            `Trying to display kvittering for sykmelding with id: ${sykmeldingId}, but the status is wrong, status: ${data.sykmelding.behandlingsutfall.status}`,
        );
        return (
            <KvitteringWrapper>
                <Veilederpanel svg={<VeilederMaleSvg />}>
                    Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt
                    med oss hvis det ikke har løst seg til i morgen.
                </Veilederpanel>
            </KvitteringWrapper>
        );
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
                <Sykmeldingsopplysninger sykmelding={data.sykmelding} expandedDefault={false} arbeidsgiver={false} />
            </Spacing>

            {data.sykmelding.sykmeldingStatus.statusEvent === 'SENDT' && (
                <Sykmeldingsopplysninger sykmelding={data.sykmelding} expandedDefault={false} arbeidsgiver />
            )}
        </KvitteringWrapper>
    );
}

function KvitteringWrapper({
    sykmelding,
    children,
}: PropsWithChildren<{ sykmelding?: SykmeldingFragment }>): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam();
    return (
        <>
            <Head>
                <title>Kvittering - www.nav.no</title>
            </Head>
            <Header
                title={sykmelding ? getSykmeldingTitle(sykmelding) : undefined}
                subTitle={sykmelding ? getReadableSykmeldingLength(sykmelding) : undefined}
            />
            <PageWrapper>
                <Brodsmuler
                    breadcrumbs={[
                        { title: 'Sykmeldinger', path: '/' },
                        { title: sykmelding ? getSykmeldingTitle(sykmelding) : 'Sykmelding', path: `/${sykmeldingId}` },
                        { title: 'Kvittering' },
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

export default SykmeldingkvitteringPage;
