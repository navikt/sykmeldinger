import React, { useEffect } from 'react';
import useFetch, { areAnyNotStartetOrPending } from '../../hooks/useFetch';
import { Sykmelding } from '../../types/sykmelding';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Header from '../commonComponents/Header/Header';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import LenkepanelContainer from './LenkepanelContainer';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederFemaleSvg from '../commonComponents/Veileder/svg/VeilederFemaleSvg';

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

    // TODO: Refactor
    if (sykmeldingerFetcherError) {
        return <div>Feil med baksystemet</div>;
    }

    if (areAnyNotStartetOrPending([sykmeldingerFetcherStatus])) {
        return (
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Undertittel style={{ marginBottom: '15px' }}>Laster sykmelding</Undertittel>
                <NavFrontendSpinner />
            </div>
        );
    }

    if (!sykmeldinger?.length) {
        // TODO: Return veileder telling that you might have gotten the sykmelding in paper
        return null;
    }

    const apenAndAvvistSykemdinger = sykmeldinger.filter(
        (sykmelding) =>
            sykmelding.sykmeldingStatus.statusEvent === 'APEN' || sykmelding.behandlingsutfall.status === 'INVALID',
    );
    const pastSykmeldinger = sykmeldinger.filter(
        (sykmelding) =>
            sykmelding.sykmeldingStatus.statusEvent !== 'APEN' && sykmelding.behandlingsutfall.status !== 'INVALID',
    );
    // TODO: Refactor to proper component
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
                <div className="container--margin-bottom">
                    <Veilederpanel kompakt fargetema="info" svg={<VeilederFemaleSvg />}>
                        NAV mottar alle sykmeldinger. Ser du den ikke her? Det betyr at den som har sykmeldt deg ikke
                        sender den digitalt til NAV. Da bruker du papirsykmeldingen i stedet.
                    </Veilederpanel>
                </div>
                <LenkepanelContainer title="Nye sykmeldinger" sykmeldinger={apenAndAvvistSykemdinger} />
                <LenkepanelContainer title="Tidligere sykmeldinger" sykmeldinger={pastSykmeldinger} showSortBy />
            </div>
        </>
    );
};

export default SykmeldingerPage;
