import React from 'react';
import { useParams } from 'react-router-dom';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import useSykmelding from '../../hooks/useSykmelding';
import OkBekreftetSykmelding from './OK/BEKREFTET/OkBekreftetSykmelding';
import OkAvbruttSykmelding from './OK/AVBRUTT/OkAvbruttSykmelding';
import OkSendtSykmelding from './OK/SENDT/OkSendtSykmelding';
import OkUtgattSykmelding from './OK/UTGATT/OkUtgattSykmelding';
import OkApenSykmelding from './OK/APEN/OkApenSykmelding';
import InvalidApenSykmelding from './INVALID/APEN/InvalidApenSykmelding';
import InvalidBekreftetSykmelding from './INVALID/BEKREFTET/InvalidBekreftetSykmelding';
import PageWrapper from '../commonComponents/PageWrapper/PageWrapper';

const SykmeldingPage: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading) {
        return <Spinner headline="Henter sykmelding" />;
    }

    if (error || sykmelding === undefined) {
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>
                    <Undertittel>Beklager, vi har problemer med baksystemene for øyeblikket.</Undertittel>
                    <Normaltekst>Det kan ta litt tid å rette opp feilen. Vennligst prøv igjen senere!</Normaltekst>
                </AlertStripeAdvarsel>
            </PageWrapper>
        );
    }

    const SykmeldingComponent: JSX.Element = (() => {
        const behandlingsutfall = sykmelding.behandlingsutfall.status;
        const status = sykmelding.sykmeldingStatus.statusEvent;

        switch (behandlingsutfall) {
            case 'OK':
            case 'MANUAL_PROCESSING':
                switch (status) {
                    case 'APEN':
                        return <OkApenSykmelding sykmelding={sykmelding} />;
                    case 'BEKREFTET':
                        return <OkBekreftetSykmelding sykmelding={sykmelding} />;
                    case 'SENDT':
                        return <OkSendtSykmelding sykmelding={sykmelding} />;
                    case 'AVBRUTT':
                        return <OkAvbruttSykmelding sykmelding={sykmelding} />;
                    case 'UTGATT':
                        return <OkUtgattSykmelding sykmelding={sykmelding} />;
                    default:
                        // TODO: make seperate component
                        return <div>Ugylding status</div>;
                }
            case 'INVALID':
                switch (status) {
                    case 'APEN':
                        return <InvalidApenSykmelding sykmelding={sykmelding} />;
                    case 'BEKREFTET':
                        return <InvalidBekreftetSykmelding sykmelding={sykmelding} />;
                    default:
                        // TODO: make seperate component
                        return <div>Ugylding status</div>;
                }
        }
    })();

    return <PageWrapper sykmelding={sykmelding}>{SykmeldingComponent}</PageWrapper>;
};

export default SykmeldingPage;
