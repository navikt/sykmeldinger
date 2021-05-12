import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { useParams } from 'react-router-dom';
import useSykmelding from '../../hooks/useSykmelding';
import Header from '../commonComponents/Header/Header';
import Spacing from '../commonComponents/Spacing/Spacing';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Spinner from '../commonComponents/Spinner/Spinner';
import StatusBanner from '../commonComponents/StatusBanner/StatusBanner';
import TilHovedsiden from '../commonComponents/TilHovedsiden/TilHovedsiden';
import VeilederMaleSvg from '../commonComponents/Veileder/svg/VeilederMaleSvg';
import StatusInfo from '../sykmelding/components/StatusInfo/StatusInfo';
import SykmeldingPageWrapper from '../sykmelding/components/SykmeldingPageWrapper';
import Sykmeldingsopplysninger from '../sykmelding/components/Sykmeldingview/SykmeldingsopplysningerContainer';

const SykmeldingkvitteringPage: React.FC = () => {
    document.title = 'Sykmelding - www.nav.no';
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();

    const { isLoading, error, data: sykmelding } = useSykmelding(sykmeldingId);

    if (isLoading) {
        return <Spinner headline="Laster kvittering" />;
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

    if (
        sykmelding.behandlingsutfall.status === 'INVALID' ||
        ['SENDT', 'BEKREFTET'].includes(sykmelding.sykmeldingStatus.statusEvent) === false
    ) {
        return (
            <SykmeldingPageWrapper>
                <Veilederpanel svg={<VeilederMaleSvg />}>Oisann! ser ut som du er på feil sted.</Veilederpanel>
            </SykmeldingPageWrapper>
        );
    }

    return (
        <>
            <Header title={sykmelding?.getSykmeldingTitle()} sykmelding={sykmelding} />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: window._env_?.SYKEFRAVAER_ROOT || '#',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: window._env_?.SYKMELDINGER_ROOT || '#',
                        },
                        {
                            title: sykmelding?.getSykmeldingTitle() ?? 'Sykmelding',
                            path: window._env_?.SYKMELDINGER_ROOT + `/${sykmeldingId}` || '#',
                        },
                        {
                            title: 'Kvittering',
                        },
                    ]}
                />
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
                <Spacing direction="top" amount="large">
                    <TilHovedsiden />
                </Spacing>
            </div>
        </>
    );
};

export default SykmeldingkvitteringPage;
