import React, { PropsWithChildren } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Alert, Link } from '@navikt/ds-react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Head from 'next/head';

import Spinner from '../components/Spinner/Spinner';
import useSykmeldinger from '../hooks/useSykmeldinger';
import useHotjarTrigger from '../hooks/useHotjarTrigger';
import Spacing from '../components/Spacing/Spacing';
import { logger } from '../utils/logger';
import InfoOmDigitalSykmelding from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding';
import { isActiveSykmelding } from '../utils/sykmeldingUtils';
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

    const { apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(data.sykmeldinger);

    return (
        <IndexWrapper>
            <SykmeldingLinkPanel type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

            <Spacing amount="small">
                <InfoOmDigitalSykmelding />
            </Spacing>

            <Ekspanderbartpanel tittel="Ser du ikke sykmeldingen din her?">
                <Spacing amount="small">
                    <Normaltekst>
                        Det betyr at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du
                        papirsykmeldingen i stedet.
                    </Normaltekst>
                </Spacing>

                <Link href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer">
                    Mer informasjon om papirsykmelding finner du her.
                </Link>
            </Ekspanderbartpanel>

            <SykmeldingLinkPanel type="TIDLIGERE_SYKMELDINGER" sykmeldinger={pastSykmeldinger} />
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

function filterSykmeldinger(sykmeldinger: readonly SykmeldingFragment[]): {
    apenSykmeldinger: SykmeldingFragment[];
    pastSykmeldinger: SykmeldingFragment[];
} {
    const apenSykmeldinger = sykmeldinger.filter((sykmelding) => isActiveSykmelding(sykmelding));
    const pastSykmeldinger = sykmeldinger.filter((sykmelding) => !isActiveSykmelding(sykmelding));

    return { apenSykmeldinger, pastSykmeldinger };
}

export const getServerSideProps = withAuthenticatedPage();

export default SykmeldingerPage;
