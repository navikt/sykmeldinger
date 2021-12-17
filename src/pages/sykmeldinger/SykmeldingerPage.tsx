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
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import dayjs from 'dayjs';
import InfoOmDigitalSykmelding from '../../components/InfoOmDigitalSykmelding/InfoOmDigitalSykmelding';

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
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    {error.message}
                </AlertStripeAdvarsel>
            </PageWrapper>
        );
    }
    if (sykmeldinger === undefined) {
        logger.error('Sykmeldinger is undefined');
        return (
            <PageWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </PageWrapper>
        );
    }

    const { apenSykmeldinger, pastSykmeldinger } = filterSykmeldinger(sykmeldinger);

    return (
        <PageWrapper>
            <LenkepanelContainer type="NYE_SYKMELDINGER" sykmeldinger={apenSykmeldinger} />

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

            <LenkepanelContainer type="TIDLIGERE_SYKMELDINGER" sykmeldinger={pastSykmeldinger} />
        </PageWrapper>
    );
};

function isPastSykmelding(sykmelding: Sykmelding) {
    if (isUnderbehandling(sykmelding)) {
        return false;
    }

    const isSykmeldingApen = sykmelding.sykmeldingStatus.statusEvent === 'APEN';
    const isSykmelding3MonthsOld = dayjs(sykmelding.getSykmeldingEndDate()).isBefore(dayjs().subtract(3, 'months'));

    return !isSykmeldingApen || isSykmelding3MonthsOld;
}

function filterSykmeldinger(sykmeldinger: Sykmelding[]): {
    apenSykmeldinger: Sykmelding[];
    pastSykmeldinger: Sykmelding[];
} {
    const apenSykmeldinger = sykmeldinger.filter((sykmelding) => !isPastSykmelding(sykmelding));
    const pastSykmeldinger = sykmeldinger.filter((sykmelding) => isPastSykmelding(sykmelding));

    return { apenSykmeldinger, pastSykmeldinger };
}

function isUnderbehandling(sykmelding: Sykmelding): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === 'SENDT' &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    );
}

export default SykmeldingerPage;
