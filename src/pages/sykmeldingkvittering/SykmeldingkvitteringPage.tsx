import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { useParams } from 'react-router-dom';
import useSykmelding from '../../hooks/useSykmelding';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Spacing from '../../components/Spacing/Spacing';
import Spinner from '../../components/Spinner/Spinner';
import StatusBanner from '../../components/StatusBanner/StatusBanner';
import VeilederMaleSvg from '../../components/Veileder/svg/VeilederMaleSvg';
import StatusInfo from '../../components/StatusInfo/StatusInfo';
import Sykmeldingsopplysninger from '../../components/Sykmeldingview/SykmeldingsopplysningerContainer';
import { logger } from '../../utils/logger';

const SykmeldingkvitteringPage: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading) {
        return <Spinner headline="Laster kvittering" />;
    }

    if (error) {
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>{error.message}</AlertStripeAdvarsel>
            </PageWrapper>
        );
    }
    if (sykmelding === undefined) {
        logger.error(`Sykmelding with id ${sykmeldingId} is undefined`);
        return (
            <PageWrapper>
                <AlertStripeAdvarsel>
                    En uventet feil oppsto. Vennligst kontakt NAV dersom problemet vedvarer.
                </AlertStripeAdvarsel>
            </PageWrapper>
        );
    }

    if (
        sykmelding.behandlingsutfall.status === 'INVALID' ||
        ['SENDT', 'BEKREFTET'].includes(sykmelding.sykmeldingStatus.statusEvent) === false
    ) {
        return (
            <PageWrapper>
                <Veilederpanel svg={<VeilederMaleSvg />}>Oisann! ser ut som du er på feil sted.</Veilederpanel>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper sykmelding={sykmelding}>
            <Spacing>
                <StatusBanner
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    behandlingsutfall={sykmelding.behandlingsutfall}
                />
            </Spacing>

            <Spacing>
                <StatusInfo
                    sykmeldingStatus={sykmelding.sykmeldingStatus}
                    sykmeldingsperioder={sykmelding.sykmeldingsperioder}
                />
            </Spacing>

            <Spacing>
                <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} />
            </Spacing>

            {sykmelding.sykmeldingStatus.statusEvent === 'SENDT' && (
                <Sykmeldingsopplysninger sykmelding={sykmelding} expandedDefault={false} arbeidsgiver />
            )}
        </PageWrapper>
    );
};

export default SykmeldingkvitteringPage;