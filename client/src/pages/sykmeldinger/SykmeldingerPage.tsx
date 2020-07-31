import React, { useEffect } from 'react';
import useFetch, { areAnyNotStartetOrPending } from '../commonComponents/hooks/useFetch';
import { Sykmelding } from '../../types/sykmelding';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Header from '../commonComponents/Header/Header';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederFemaleSvg from '../commonComponents/Veileder/svg/VeilederFemaleSvg';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import LenkepanelContainer from './components/LenkepanelContainer';

const SykmeldingerPage = () => {
    document.title = 'Sykmeldinger - www.nav.no';

    const {
        status: sykmeldingerFetcherStatus,
        data: sykmeldinger,
        error: sykmeldingerFetcherError,
        fetch: fetchSykmeldinger,
    } = useFetch<Sykmelding[]>(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmeldinger`, (sykmeldinger) =>
        sykmeldinger.map((sykmelding: any) => new Sykmelding(sykmelding)),
    );

    useEffect(() => {
        fetchSykmeldinger();
    }, [fetchSykmeldinger]);

    if (areAnyNotStartetOrPending([sykmeldingerFetcherStatus])) {
        return <Spinner headline="Henter dine sykmeldinger" />;
    }

    if (sykmeldingerFetcherError || sykmeldinger === undefined) {
        return (
            <>
                <Header title="Dine sykmeldinger" />
                <div className="limit">
                    <Brodsmuler
                        breadcrumbs={[
                            {
                                title: 'Sykefravær',
                                path: '/',
                            },
                            {
                                title: 'Sykmeldinger',
                            },
                        ]}
                    />
                    <AlertStripeAdvarsel>
                        <Undertittel>Beklager, vi har problemer med baksystemene for øyeblikket.</Undertittel>
                        <Normaltekst>Det kan ta litt tid å rette opp feilen. Vennligst prøv igjen senere!</Normaltekst>
                    </AlertStripeAdvarsel>
                </div>
            </>
        );
    }

    const apenAndAvvistSykmeldinger = sykmeldinger.filter(
        (sykmelding) =>
            sykmelding.sykmeldingStatus.statusEvent === 'APEN' || sykmelding.behandlingsutfall.status === 'INVALID',
    );
    const pastSykmeldinger = sykmeldinger.filter(
        (sykmelding) =>
            sykmelding.sykmeldingStatus.statusEvent !== 'APEN' && sykmelding.behandlingsutfall.status !== 'INVALID',
    );

    return (
        <>
            <Header title="Dine sykmeldinger" />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: '/',
                        },
                        {
                            title: 'Sykmeldinger',
                        },
                    ]}
                />
                <div className="margin-bottom--4">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederFemaleSvg />}>
                        NAV mottar alle sykmeldinger. Ser du den ikke her? Det betyr at den som har sykmeldt deg ikke
                        sender den digitalt til NAV. Da bruker du papirsykmeldingen i stedet.
                    </Veilederpanel>
                </div>
                <LenkepanelContainer title="Nye sykmeldinger" sykmeldinger={apenAndAvvistSykmeldinger} />
                <LenkepanelContainer title="Tidligere sykmeldinger" sykmeldinger={pastSykmeldinger} showSortBy />
            </div>
        </>
    );
};

export default SykmeldingerPage;
