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
import useFetch, { areAnyNotStartetOrPending } from '../commonComponents/hooks/useFetch';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Soknad } from '../../types/soknad';
import UtgattSykmelding from './UtgattSykmelding/UtgattSykmelding';
import EgenmeldtSykmelding from './EgenmeldtSykmelding/EgenmeldtSykmelding';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Spinner from '../commonComponents/Spinner/Spinner';
import ApenPapirsykmelding from './ApenSykmelding/ApenPapirsykmelding';

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

    if (
        areAnyNotStartetOrPending([
            sykmeldingFetcherStatus,
            arbeidsgivereFetcherStatus,
            erUtenforVentetidFetcherStatus,
            soknaderFetcherStatus,
        ])
    ) {
        return <Spinner headline="Henter sykmelding" />;
    }

    if (
        sykmeldingFetcherError ||
        sykmelding === undefined ||
        arbeidsgivereFetcherError ||
        arbeidsgivere === undefined ||
        erUtenforVentetidError ||
        erUtenforVentetid === undefined ||
        soknaderFetcherError ||
        soknader === undefined
    ) {
        return (
            <>
                <Header title="Sykmelding" />
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
                    <AlertStripeAdvarsel>
                        <Undertittel>Beklager, vi har problemer med baksystemene for øyeblikket.</Undertittel>
                        <Normaltekst>Det kan ta litt tid å rette opp feilen. Vennligst prøv igjen senere!</Normaltekst>
                    </AlertStripeAdvarsel>
                </div>
            </>
        );
    }

    const SykmeldingComponent = (() => {
        const erAvvist = sykmelding.behandlingsutfall.status === 'INVALID';
        const erEgenmeldt = sykmelding.egenmeldt;
        const erPapir = sykmelding.papirsykmelding;
        const status = sykmelding.sykmeldingStatus.statusEvent;

        // erAvvist and erEgenmeldt needs to be checkt first because these flags are not part of the status
        if (erAvvist) {
            return <AvvistSykmelding sykmelding={sykmelding} />;
        }
        if (erEgenmeldt) {
            return <EgenmeldtSykmelding sykmelding={sykmelding} />;
        }

        switch (status) {
            case 'APEN':
                if (erPapir) {
                    return (
                        <ApenPapirsykmelding
                            sykmelding={sykmelding}
                            arbeidsgivere={arbeidsgivere}
                            sykmeldingUtenforVentetid={erUtenforVentetid}
                            fetchSykmelding={fetchSykmelding}
                        />
                    );
                }
                return (
                    <ApenSykmelding
                        sykmelding={sykmelding}
                        arbeidsgivere={arbeidsgivere}
                        sykmeldingUtenforVentetid={erUtenforVentetid}
                        fetchSykmelding={fetchSykmelding}
                    />
                );
            case 'AVBRUTT':
                return <AvbruttSykmelding sykmelding={sykmelding} fetchSykmelding={fetchSykmelding} />;
            case 'SENDT':
                return <SendtSykmelding sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} soknader={soknader} />;
            case 'BEKREFTET':
                return (
                    <BekreftetSykmelding sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} soknader={soknader} />
                );
            case 'UTGATT':
                return <UtgattSykmelding sykmelding={sykmelding} />;
            default:
                // TODO: Errorcomponent -  not found
                break;
        }
    })();

    return (
        <>
            <Header
                title={sykmelding.egenmeldt ? 'Egenmelding' : 'Sykmelding'}
                sykmeldingPerioder={sykmelding.sykmeldingsperioder}
            />
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
