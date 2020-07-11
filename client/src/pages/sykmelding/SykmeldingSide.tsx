import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AvbruttSykmelding from './AvbruttSykmelding/AvbruttSykmelding';
import AvvistSykmelding from './AvvistSykmelding/AvvistSykmelding';
import BekreftetSykmelding from './BekreftetSykmelding/BekreftetSykmelding';
import Brodsmuler from '../commonComponents/Breadcrumbs/Breadcrumbs';
import Header from '../commonComponents/Header/Header';
import ApenSykmelding from './ApenSykmelding/ApenSykmelding';
import SendtSykmelding from './SendtSykmelding/SendtSykmelding';
import { Arbeidsgiver } from '../../types/arbeidsgiver';
import { Sykmelding } from '../../types/sykmelding';
import useFetch, { areAnyNotStartetOrPending } from '../../hooks/useFetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { Soknad } from '../../types/soknad';

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
        `${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`,
        (sykmelding) => new Sykmelding(sykmelding),
    );
    const {
        status: arbeidsgivereFetcherStatus,
        data: arbeidsgivere,
        error: arbeidsgivereFetcherError,
        fetch: fetchArbeidsgivere,
    } = useFetch<Arbeidsgiver[]>(`${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere`, (arbeidsgivere) =>
        arbeidsgivere.map((arbeidsgiver: any) => new Arbeidsgiver(arbeidsgiver)),
    );
    const {
        status: erUtenforVentetidFetcherStatus,
        data: erUtenforVentetid,
        error: erUtenforVentetidError,
        fetch: fetchErUtenforVentetid,
    } = useFetch<boolean>(
        `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/${sykmeldingId}/actions/erUtenforVentetid`,
        (data) => data.erUtenforVentetid,
    );
    const {
        status: soknaderFetcherStatus,
        data: soknader,
        error: soknaderFetcherError,
        fetch: fetchSoknader,
    } = useFetch<Soknad[]>(`${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/sykmelding/${sykmeldingId}`, (soknader) =>
        soknader.map((soknad: any) => new Soknad(soknad)),
    );

    useEffect(() => {
        fetchSykmelding();
        fetchArbeidsgivere();
        fetchErUtenforVentetid();
        fetchSoknader();
    }, [fetchSykmelding, fetchArbeidsgivere, fetchErUtenforVentetid, fetchSoknader]);

    // TODO: Refactor to proper errormessage
    if (sykmeldingFetcherError || arbeidsgivereFetcherError || erUtenforVentetidError || soknaderFetcherError) {
        return <div>Feil med baksystemet</div>;
    }

    // TODO: Refactor
    if (
        areAnyNotStartetOrPending([
            sykmeldingFetcherStatus,
            arbeidsgivereFetcherStatus,
            erUtenforVentetidFetcherStatus,
            soknaderFetcherStatus,
        ])
    ) {
        return (
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Undertittel style={{ marginBottom: '15px' }}>Laster sykmelding</Undertittel>
                <NavFrontendSpinner />
            </div>
        );
    }

    // TODO: Find out if this check can be infered automaticatlly
    if (
        sykmelding === undefined ||
        arbeidsgivere === undefined ||
        erUtenforVentetid === undefined ||
        soknader === undefined
    ) {
        // TODO: Error-melding, ingen sykmelding funnet
        return null;
    }

    const SykmeldingComponent = (() => {
        const erAvvist = sykmelding.behandlingsutfall.status === 'INVALID';
        const erEgenmeldt = sykmelding.egenmeldt;
        const status = sykmelding.sykmeldingStatus.statusEvent;

        // erAvvist and erEgenmeldt needs to be checkt first because these flags are not part of the status
        if (erAvvist) {
            return <AvvistSykmelding sykmelding={sykmelding} />;
        }
        if (erEgenmeldt) {
            // TODO: Egenmeldt component
        }

        switch (status) {
            case 'APEN':
                return (
                    <ApenSykmelding
                        sykmelding={sykmelding}
                        arbeidsgivere={arbeidsgivere}
                        sykmeldingUtenforVentetid={erUtenforVentetid}
                    />
                );
            case 'AVBRUTT':
                return <AvbruttSykmelding sykmelding={sykmelding} />;
            case 'SENDT':
                return <SendtSykmelding sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} soknader={soknader} />;
            case 'BEKREFTET':
                return (
                    <BekreftetSykmelding sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} soknader={soknader} />
                );
            default:
                // TODO: Errorcomponent -  not found
                break;
        }
    })();

    return (
        <>
            <Header title="Sykmelding" sykmeldingPerioder={sykmelding.sykmeldingsperioder} />
            <div className="limit">
                <Brodsmuler
                    breadcrumbs={[
                        {
                            title: 'Sykefravær',
                            path: '/',
                        },
                        {
                            title: 'Sykmeldinger',
                            path: '/sykmeldinger',
                        },
                        {
                            title: 'Sykmelding',
                        },
                    ]}
                />
                {SykmeldingComponent}
            </div>
        </>
    );
};

export default SykmeldingSide;
