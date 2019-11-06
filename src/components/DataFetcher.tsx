import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, { isNotStarted, FetchState, hasData, isAnyNotStartedOrPending, hasAnyFailed } from '../hooks/useFetch';
import useAppStore from '../store/useAppStore';

const DataFetcher = (props: { children: any }) => {
    const { setSykmeldinger, setNaermesteLedere } = useAppStore();
    const sykmeldingerFetcher = useFetch<any[]>();

    useEffect(() => {
        if (isNotStarted(sykmeldingerFetcher)) {
            sykmeldingerFetcher.fetch('/syforest/sykmeldinger', undefined, (fetchState: FetchState<any[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data);
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
