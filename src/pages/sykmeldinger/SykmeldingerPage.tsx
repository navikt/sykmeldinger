import React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../../components/Spinner/Spinner';
import LenkepanelContainer from './components/LenkepanelContainer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import useSykmeldinger from '../../hooks/useSykmeldinger';
import useHotjarTrigger from '../../hooks/useHotjarTrigger';
import Spacing from '../../components/Spacing/Spacing';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const SykmeldingerPage: React.FC = () => {
    document.title = 'Sykmeldinger - www.nav.no';
    useHotjarTrigger('SYKMELDINGER');

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
            <PageWrapper>
                <AlertStripeAdvarsel>{error.message}</AlertStripeAdvarsel>
            </PageWrapper>
        );
    }

    if (sykmeldinger === undefined) {
        console.error(`Sykmeldinger er undefined`);
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>
                    <Undertittel>Beklager, vi har problemer med baksystemene for øyeblikket.</Undertittel>
                    <Normaltekst>Det kan ta litt tid å rette opp feilen. Vennligst prøv igjen senere!</Normaltekst>
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
