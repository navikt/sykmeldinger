import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../../components/Spinner/Spinner';
import LenkepanelContainer from './components/LenkepanelContainer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import useSykmeldinger from '../../hooks/useSykmeldinger';
import useHotjarTrigger from '../../hooks/useHotjarTrigger';
import Spacing from '../../components/Spacing/Spacing';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { logger } from '../../utils/logger';

const SykmeldingerPage: React.FC = () => {
    document.title = 'Sykmeldinger - www.nav.no';
    useHotjarTrigger('SYKMELDING_LISTEVISNING');

    const { isLoading, isFetching, error, data: sykmeldinger } = useSykmeldinger();

    if (isLoading || isFetching) {
        return (
            <Spacing>
                <Spinner headline="Henter dine sykmeldinger" />
            </Spacing>
        );
    }

    if (error) {
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>{error.message}</AlertStripeAdvarsel>
            </PageWrapper>
        );
    }
    if (sykmeldinger === undefined) {
        logger.error('Sykmeldinger is undefined');
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </PageWrapper>
        );
    }

    const apenSykmeldinger = sykmeldinger.filter((sykmelding) => sykmelding.sykmeldingStatus.statusEvent === 'APEN');
    const pastSykmeldinger = sykmeldinger.filter((sykmelding) => sykmelding.sykmeldingStatus.statusEvent !== 'APEN');

    return (
        <PageWrapper>
            <LenkepanelContainer type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

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

            <LenkepanelContainer type="TIDLIGERE_SYKMELDINGER" sykmeldinger={pastSykmeldinger} />
        </PageWrapper>
    );
};

export default SykmeldingerPage;
