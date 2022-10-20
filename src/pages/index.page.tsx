import React, { PropsWithChildren } from 'react';
import { Accordion, Alert, BodyShort, Link } from '@navikt/ds-react';
import Head from 'next/head';
import { groupBy } from 'remeda';
import { logger } from '@navikt/next-logger';

import Spinner from '../components/Spinner/Spinner';
import useSykmeldinger from '../hooks/useSykmeldinger';
import useHotjarTrigger from '../hooks/useHotjarTrigger';
import Spacing from '../components/Spacing/Spacing';
import InfoOmDigitalSykmelding from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding';
import { isActiveSykmelding, isUnderbehandling } from '../utils/sykmeldingUtils';
import SykmeldingLinkPanel from '../components/SykmeldingLinkPanel/SykmeldingLinkPanel';
import Header from '../components/Header/Header';
import Brodsmuler from '../components/Breadcrumbs/Breadcrumbs';
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import { SykmeldingFragment } from '../fetching/graphql.generated';

const SykmeldingerPage: React.FC = () => {
    useHotjarTrigger('SYKMELDING_LISTEVISNING');

    const { data, error, loading } = useSykmeldinger();

    if (loading) {
        return (
            <Spacing>
                <Spinner headline="Henter dine sykmeldinger" />
            </Spacing>
        );
    }

    if (error) {
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    Vi har problemer med baksystemene for øyeblikket.
                </Alert>
            </IndexWrapper>
        );
    }
    if (data?.sykmeldinger == null) {
        logger.error('Sykmeldinger is undefined');
        return (
            <IndexWrapper>
                <Alert variant="error" role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </Alert>
            </IndexWrapper>
        );
    }

    const { underBehandling, apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger);

    return (
        <IndexWrapper>
            <SykmeldingLinkPanel title="Under behandling" type="UNDER_BEHANDLING" sykmeldinger={underBehandling} />
            <SykmeldingLinkPanel title="Nye sykmeldinger" type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <Spacing amount="small">
                <InfoOmDigitalSykmelding />
            </Spacing>

            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>Ser du ikke sykmeldingen din her?</Accordion.Header>
                    <Accordion.Content>
                        <Spacing amount="small">
                            <BodyShort>
                                Det betyr at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du
                                papirsykmeldingen i stedet.
                            </BodyShort>
                        </Spacing>

                        <Link href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer">
                            Mer informasjon om papirsykmelding finner du her.
                        </Link>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <SykmeldingLinkPanel
                title="Tidligere sykmeldinger"
                type="TIDLIGERE_SYKMELDINGER"
                sykmeldinger={pastSykmeldinger}
            />
        </IndexWrapper>
    );
};

function IndexWrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
        <>
            <Head>
                <title>Sykmeldinger - www.nav.no</title>
            </Head>
            <Header title="Dine sykmeldinger" />
            <PageWrapper>
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykmeldinger',
                        },
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

type SykmeldingSections = {
    apenSykmeldinger: SykmeldingFragment[];
    pastSykmeldinger: SykmeldingFragment[];
    underBehandling: SykmeldingFragment[];
};

const groupByPredicate = (sykmelding: SykmeldingFragment): keyof SykmeldingSections => {
    if (isUnderbehandling(sykmelding)) return 'underBehandling';
    else if (isActiveSykmelding(sykmelding)) return 'apenSykmeldinger';
    else return 'pastSykmeldinger';
};

function filterSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]): SykmeldingSections {
    const grouped: Record<keyof SykmeldingSections, SykmeldingFragment[]> = groupBy(sykmeldinger, groupByPredicate);

    return {
        apenSykmeldinger: grouped.apenSykmeldinger ?? [],
        pastSykmeldinger: grouped.pastSykmeldinger ?? [],
        underBehandling: grouped.underBehandling ?? [],
    };
}

export const getServerSideProps = withAuthenticatedPage();

export default SykmeldingerPage;
