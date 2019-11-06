import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, { isNotStarted, FetchState, hasData, isAnyNotStartedOrPending, hasAnyFailed } from '../hooks/useFetch';
import useAppStore from '../store/useAppStore';
import { Sykmelding } from '../types/sykmeldingTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmelding, setNaermesteLedere } = useAppStore();
    const sykmeldingFetcher = useFetch<Sykmelding>();

    useEffect(() => {
        if (isNotStarted(sykmeldingFetcher)) {
            sykmeldingFetcher.fetch('/syforest/sykmelding', undefined, (fetchState: FetchState<any>) => {
                if (hasData(fetchState)) {
                    const sykmelding = new Sykmelding(fetchState.data);
                    setSykmelding(sykmelding);
                }
            });
        }
    }, [setSykmelding, sykmeldingFetcher]);

    if (isAnyNotStartedOrPending([sykmeldingFetcher])) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
