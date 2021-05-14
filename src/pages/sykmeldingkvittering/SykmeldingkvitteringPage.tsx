import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { useParams } from 'react-router-dom';
import useSykmelding from '../../hooks/useSykmelding';
import PageWrapper from '../commonComponents/PageWrapper/PageWrapper';
import Spacing from '../commonComponents/Spacing/Spacing';
import Spinner from '../commonComponents/Spinner/Spinner';
import StatusBanner from '../commonComponents/StatusBanner/StatusBanner';
import VeilederMaleSvg from '../commonComponents/Veileder/svg/VeilederMaleSvg';
import StatusInfo from '../sykmelding/components/StatusInfo/StatusInfo';
import Sykmeldingsopplysninger from '../sykmelding/components/Sykmeldingview/SykmeldingsopplysningerContainer';

const SykmeldingkvitteringPage: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading) {
        return <Spinner headline="Laster kvittering" />;
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
