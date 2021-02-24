import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../commonComponents/Header/Header';
import ApenSykmelding from './ApenSykmelding/ApenSykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import { Sykmelding } from '../../types/sykmelding';
import useFetch, { areAnyNotStartetOrPending } from '../commonComponents/hooks/useFetch';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import UtgattSykmelding from './UtgattSykmelding/UtgattSykmelding';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import AvvistBekreftetSykmelding from './AvvistSykmelding/AvvistBekreftetSykmelding';
import TilHovedsiden from '../commonComponents/TilHovedsiden/TilHovedsiden';

interface SykmeldingPageWrapperProps {
    children: any;
}

const SykmeldingPageWrapper = ({ children }: SykmeldingPageWrapperProps) => {
    return (
        <>
            <Header title="Sykmelding" />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: `${process.env.REACT_APP_SYKEFRAVAER_ROOT}`,
                        },
                        {
                            title: 'Sykmeldinger',
                            path: `${process.env.REACT_APP_SYKMELDINGER_ROOT}`,
                        },
                        {
                            title: 'Sykmelding',
                        },
                    ]}
                />
                {children}
            </div>
            <TilHovedsiden />
        </>
    );
};

// BUSINESS LOGIC CONTROLLER
const SykmeldingSide = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams();

    // Initialize fetchers
    const {
        status: sykmeldingFetcherStatus,
        data: sykmelding,
        error: sykmeldingFetcherError,
        fetch: fetchSykmelding,
    } = useFetch<Sykmelding>(
        `${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmeldinger/${sykmeldingId}`,
        (sykmelding) => new Sykmelding(sykmelding),
    );

    useEffect(() => {
        fetchSykmelding();
    }, [fetchSykmelding]);

    if (areAnyNotStartetOrPending([sykmeldingFetcherStatus])) {
        return <Spinner headline="Henter sykmelding" />;
    }

    if (sykmeldingFetcherError || sykmelding === undefined) {
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
                    return <div>Ugylding status</div>;
            }
        } else if (behandlingsutfall === 'INVALID') {
            switch (status) {
                case 'APEN':
                    return <AvvistSykmelding sykmelding={sykmelding} />;
                case 'BEKREFTET':
                    return <AvvistBekreftetSykmelding sykmelding={sykmelding} />;
                default:
                    return <div>Ugylding status</div>;
            }
        } else {
            return <div>Ugylding behandlingsutfall</div>;
        }
    })();

    return <SykmeldingPageWrapper>{SykmeldingComponent}</SykmeldingPageWrapper>;
};

export default SykmeldingSide;
