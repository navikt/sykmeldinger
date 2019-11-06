import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, { isNotStarted, FetchState, hasData, isAnyNotStartedOrPending, hasAnyFailed } from '../hooks/useFetch';
import useAppStore from '../store/useAppStore';
import { Sykmelding } from '../types/sykmeldingTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmeldinger, setNaermesteLedere } = useAppStore();
    const sykmeldingerFetcher = useFetch<Sykmelding[]>();

    useEffect(() => {
        if (isNotStarted(sykmeldingerFetcher)) {
            sykmeldingerFetcher.fetch('/syforest/sykmeldinger', undefined, (fetchState: FetchState<any[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data.map(sykmelding => new Sykmelding(sykmelding.receivedSykmelding.sykmelding)));
                }
            });
        }
    }, [setSykmeldinger, sykmeldingerFetcher]);

    if (isAnyNotStartedOrPending([sykmeldingerFetcher])) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingerFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
