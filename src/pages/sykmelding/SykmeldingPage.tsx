import React from 'react';
import { useParams } from 'react-router-dom';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import SykmeldingPageWrapper from '../sykmelding/components/SykmeldingPageWrapper';
import useSykmelding from '../../hooks/useSykmelding';
import OkBekreftetSykmelding from './OK/BEKREFTET/OkBekreftetSykmelding';
import OkAvbruttSykmelding from './OK/AVBRUTT/OkAvbruttSykmelding';
import OkSendtSykmelding from './OK/SENDT/OkSendtSykmelding';
import OkUtgattSykmelding from './OK/UTGATT/OkUtgattSykmelding';
import OkApenSykmelding from './OK/APEN/OkApenSykmelding';
import InvalidApenSykmelding from './INVALID/APEN/InvalidApenSykmelding';
import InvalidBekreftetSykmelding from './INVALID/BEKREFTET/InvalidBekreftetSykmelding';
import OkApenEgenmelding from './OK/APEN/OkApenEgenmelding';
import OkBekreftetEgenmelding from './OK/BEKREFTET/OkBekreftetEgenmelding';
import OkAvbruttEgenmelding from './OK/AVBRUTT/OkAvbruttEgenmelding';

// BUSINESS LOGIC CONTROLLER
const SykmeldingSide: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading) {
        return <Spinner headline="Henter sykmelding" />;
    }

    // TODO: make seperate component
    if (error || sykmelding === undefined) {
        return (
            <SykmeldingPageWrapper>
                <AlertStripeAdvarsel>
                    <Undertittel>Beklager, vi har problemer med baksystemene for øyeblikket.</Undertittel>
                    <Normaltekst>Det kan ta litt tid å rette opp feilen. Vennligst prøv igjen senere!</Normaltekst>
                </AlertStripeAdvarsel>
            </SykmeldingPageWrapper>
        );
    }

    const SykmeldingComponent: JSX.Element = (() => {
        const behandlingsutfall = sykmelding.behandlingsutfall.status;
        const status = sykmelding.sykmeldingStatus.statusEvent;

        if (behandlingsutfall === 'OK') {
            switch (status) {
                case 'APEN':
                    if (sykmelding.egenmeldt) {
                        return <OkApenEgenmelding sykmelding={sykmelding} />;
                    }
                    return <OkApenSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    if (sykmelding.egenmeldt) {
                        return <OkBekreftetEgenmelding sykmelding={sykmelding} />;
                    }
                    return <OkBekreftetSykmelding sykmelding={sykmelding} />;
                case 'SENDT':
                    return <OkSendtSykmelding sykmelding={sykmelding} />;
                case 'AVBRUTT':
                    if (sykmelding.egenmeldt) {
                        return <OkAvbruttEgenmelding sykmelding={sykmelding} />;
                    }
                    return <OkAvbruttSykmelding sykmelding={sykmelding} />;
                case 'UTGATT':
                    return <OkUtgattSykmelding sykmelding={sykmelding} />;
                default:
                    // TODO: make seperate component
                    return <div>Ugylding status</div>;
            }
        } else if (behandlingsutfall === 'INVALID') {
            switch (status) {
                case 'APEN':
                    return <InvalidApenSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <InvalidBekreftetSykmelding sykmelding={sykmelding} />;
                default:
                    // TODO: make seperate component
                    return <div>Ugylding status</div>;
            }
        } else {
            // TODO: make seperate component
            return <div>Ugylding behandlingsutfall</div>;
        }
    })();

    return <SykmeldingPageWrapper sykmelding={sykmelding}>{SykmeldingComponent}</SykmeldingPageWrapper>;
};

export default SykmeldingSide;
