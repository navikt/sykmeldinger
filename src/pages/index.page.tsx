import React, { PropsWithChildren } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import Head from 'next/head';

import Spinner from '../components/Spinner/Spinner';
import useSykmeldinger from '../hooks/useSykmeldinger';
import useHotjarTrigger from '../hooks/useHotjarTrigger';
import Spacing from '../components/Spacing/Spacing';
import { logger } from '../utils/logger';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import InfoOmDigitalSykmelding from '../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding';
import { isActiveSykmelding } from '../utils/sykmeldingUtils';
import SykmeldingLinkPanel from '../components/SykmeldingLinkPanel/SykmeldingLinkPanel';
import Header from '../components/Header/Header';
import Brodsmuler from '../components/Breadcrumbs/Breadcrumbs';
import TilHovedsiden from '../components/TilHovedsiden/TilHovedsiden';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import PageWrapper from '../components/PageWrapper/PageWrapper';

const SykmeldingerPage: React.FC = () => {
    useHotjarTrigger('SYKMELDING_LISTEVISNING');

    const { isLoading, error, data: sykmeldinger } = useSykmeldinger();

    if (isLoading) {
        return (
            <Spacing>
                <Spinner headline="Henter dine sykmeldinger" />
            </Spacing>
        );
    }

    if (error) {
        return (
            <IndexWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    {error.message}
                </AlertStripeAdvarsel>
            </IndexWrapper>
        );
    }
    if (sykmeldinger === undefined) {
        logger.error('Sykmeldinger is undefined');
        return (
            <IndexWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </IndexWrapper>
        );
    }

    const { apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(sykmeldinger);

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

                <Lenke href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer">
                    Mer informasjon om papirsykmelding finner du her.
                </Lenke>
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

function filterSykmeldinger(sykmeldinger: Sykmelding[]): {
    apenSykmeldinger: Sykmelding[];
    pastSykmeldinger: Sykmelding[];
} {
    const apenSykmeldinger = sykmeldinger.filter((sykmelding) => isActiveSykmelding(sykmelding));
    const pastSykmeldinger = sykmeldinger.filter((sykmelding) => !isActiveSykmelding(sykmelding));

    return { apenSykmeldinger, pastSykmeldinger };
}

export const getServerSideProps = withAuthenticatedPage();

export default SykmeldingerPage;
