import React from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import ApenSykmelding from './ApenSykmelding/ApenSykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import UtgattSykmelding from './UtgattSykmelding/UtgattSykmelding';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import AvvistBekreftetSykmelding from './AvvistSykmelding/AvvistBekreftetSykmelding';
import SykmeldingPageWrapper from '../sykmeldinger/components/SykmeldingPageWrapper';
import useSykmelding from '../commonComponents/hooks/useSykmelding';

// BUSINESS LOGIC CONTROLLER
const SykmeldingSide: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams();

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
                    return <ApenSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <BekreftetSykmelding sykmelding={sykmelding} />;
                case 'SENDT':
                    return <SendtSykmelding sykmelding={sykmelding} />;
                case 'AVBRUTT':
                    return <AvbruttSykmelding sykmelding={sykmelding} />;
                case 'UTGATT':
                    return <UtgattSykmelding sykmelding={sykmelding} />;
                default:
                    // TODO: make seperate component
                    return <div>Ugylding status</div>;
            }
        } else if (behandlingsutfall === 'INVALID') {
            switch (status) {
                case 'APEN':
                    return <AvvistSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <AvvistBekreftetSykmelding sykmelding={sykmelding} />;
                default:
                    // TODO: make seperate component
                    return <div>Ugylding status</div>;
            }
        } else {
            // TODO: make seperate component
            return <div>Ugylding behandlingsutfall</div>;
        }
    })();

    return <SykmeldingPageWrapper>{SykmeldingComponent}</SykmeldingPageWrapper>;
};

export default SykmeldingSide;
