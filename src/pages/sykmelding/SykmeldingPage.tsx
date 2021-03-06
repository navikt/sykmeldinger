import React from 'react';
import { useParams } from 'react-router-dom';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../../components/Spinner/Spinner';
import useSykmelding from '../../hooks/useSykmelding';
import OkBekreftetSykmelding from './OK/BEKREFTET/OkBekreftetSykmelding';
import OkAvbruttSykmelding from './OK/AVBRUTT/OkAvbruttSykmelding';
import OkSendtSykmelding from './OK/SENDT/OkSendtSykmelding';
import OkUtgattSykmelding from './OK/UTGATT/OkUtgattSykmelding';
import OkApenSykmelding from './OK/APEN/OkApenSykmelding';
import InvalidApenSykmelding from './INVALID/APEN/InvalidApenSykmelding';
import InvalidBekreftetSykmelding from './INVALID/BEKREFTET/InvalidBekreftetSykmelding';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederMaleSvg from '../../components/Veileder/svg/VeilederMaleSvg';
import { logger } from '../../utils/logger';

const SykmeldingPage: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, isFetching, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading || isFetching) {
        return <Spinner headline="Henter sykmelding" />;
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
    if (sykmelding === undefined) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`);
        return (
            <PageWrapper>
                <AlertStripeAdvarsel role="alert" aria-live="polite">
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
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
                        logger.error(`${behandlingsutfall} sykmelding with unsupported status: ${status}`);
                        return (
                            <Veilederpanel svg={<VeilederMaleSvg />}>
                                Oisann! Det har oppstått en feil i baksystemene.
                            </Veilederpanel>
                        );
                }
            case 'INVALID':
                switch (status) {
                    case 'APEN':
                        return <InvalidApenSykmelding sykmelding={sykmelding} />;
                    case 'BEKREFTET':
                        return <InvalidBekreftetSykmelding sykmelding={sykmelding} />;
                    default:
                        logger.error(`Avvist sykmelding with unsupported status: ${status}`);
                        return (
                            <Veilederpanel svg={<VeilederMaleSvg />}>
                                Oisann! Det har oppstått en feil i baksystemene.
                            </Veilederpanel>
                        );
                }
        }
    })();

    return <PageWrapper sykmelding={sykmelding}>{SykmeldingComponent}</PageWrapper>;
};

export default SykmeldingPage;
