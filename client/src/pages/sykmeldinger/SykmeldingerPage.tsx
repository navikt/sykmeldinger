import React, { useEffect } from 'react';
import useFetch, { areAnyNotStartetOrPending } from '../../hooks/useFetch';
import { Sykmelding } from '../../types/sykmelding';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';

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

    // TODO: Refactor to proper component
    return (
        <>
            <div>Liste over Sykmeldinger</div>
            <p>{JSON.stringify(sykmeldinger)}</p>
        </>
    );
};

export default SykmeldingerPage;
