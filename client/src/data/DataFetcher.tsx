import Spinner from 'nav-frontend-spinner';
import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useParams } from 'react-router-dom';

import Arbeidsgiver from '../types/arbeidsgiverTypes';
import ErUtenforVentetidData from '../types/erUtenforVentetidTypes';
import useAppStore from './useAppStore';
import useFetch, {
    FetchState,
    hasAny401,
    hasAnyFailed,
    hasData,
    isAnyNotStartedOrPending,
    isAnyPending,
    isNotStarted,
} from '../hooks/useFetch';
import { ReceivedSykmelding } from '../types/receivedSykmeldingTypes';
import { StatusTyper, Sykmelding } from '../types/sykmeldingTypes';

const DataFetcher = (props: { children?: any }) => {
    const { setSykmelding, setSykmeldingStatus, setArbeidsgivere, setSykmeldingUtenforVentetid } = useAppStore();
    const sykmeldingFetcher = useFetch<ReceivedSykmelding>();
    const arbeidsgivereFetcher = useFetch<Arbeidsgiver[]>();
    const sykmeldingUtenforVentetidFetcher = useFetch<ErUtenforVentetidData>();

    const { sykmeldingId } = useParams();

    useEffect(() => {
        console.log('Fetching data for id: ' + sykmeldingId);
        if (isNotStarted(sykmeldingFetcher)) {
            sykmeldingFetcher.fetch(
                `${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`,
                undefined,
                (fetchState: FetchState<ReceivedSykmelding>) => {
                    if (hasData(fetchState)) {
                        const { data } = fetchState;
                        const sykmelding = new Sykmelding(data.sykmelding);
                        const sykmeldingStatus = data.status;
                        setSykmelding(sykmelding);
                        setSykmeldingStatus(sykmeldingStatus);

                        arbeidsgivereFetcher.fetch(
                            `${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere/${sykmelding.id}`,
                            undefined,
                            (fetchState: FetchState<Arbeidsgiver[]>) => {
                                if (hasData(fetchState)) {
                                    const { data } = fetchState;
                                    const arbeidsgivere = data.map((ag) => new Arbeidsgiver(ag));
                                    setArbeidsgivere(arbeidsgivere);
                                }
                            },
                        );

                        // Dersom sykmeldingen er ny skal den berikes
                        if (sykmeldingStatus === StatusTyper.NY) {
                            sykmeldingUtenforVentetidFetcher.fetch(
                                `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmelding.id}/actions/erUtenforVentetid`,
                                { method: 'POST' },
                                (fetchState: FetchState<ErUtenforVentetidData>) => {
                                    if (hasData(fetchState)) {
                                        setSykmeldingUtenforVentetid(fetchState.data.erUtenforVentetid);
                                    }
                                },
                            );
                        }
                    }
                },
            );
        }
    }, [
        sykmeldingId,
        setSykmeldingUtenforVentetid,
        setSykmelding,
        setSykmeldingStatus,
        sykmeldingFetcher,
        sykmeldingUtenforVentetidFetcher,
        arbeidsgivereFetcher,
        setArbeidsgivere,
    ]);

    if (hasAny401([sykmeldingFetcher, arbeidsgivereFetcher, sykmeldingUtenforVentetidFetcher])) {
        window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href);
        window.location.href = `${process.env.REACT_APP_LOGINSERVICE_URL}?redirect=${window.location.origin}${process.env.REACT_APP_SYKMELDING_ROOT}`;
    }

    if (isAnyNotStartedOrPending([sykmeldingFetcher, arbeidsgivereFetcher])) {
        return <Spinner />;
    }

    if (isAnyPending([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher, arbeidsgivereFetcher])) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher, arbeidsgivereFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
