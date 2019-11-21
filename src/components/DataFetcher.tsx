import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, { isNotStarted, FetchState, hasData, isAnyNotStartedOrPending, hasAnyFailed } from '../hooks/useFetch';
import useAppStore from '../store/useAppStore';
import { Sykmelding } from '../types/sykmeldingTypes';
import { SykmeldingData } from '../types/sykmeldingDataTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmelding, setSykmeldingStatus, setNaermesteLedere } = useAppStore();
    const sykmeldingFetcher = useFetch<SykmeldingData>();

    useEffect(() => {
        if (isNotStarted(sykmeldingFetcher)) {
            sykmeldingFetcher.fetch('/syforest/sykmelding/', undefined, (fetchState: FetchState<SykmeldingData>) => {
                if (hasData(fetchState)) {
                    const { data } = fetchState;
                    const sykmelding = new Sykmelding(data.sykmelding);
                    const sykmeldingStatus = data.status;
                    setSykmelding(sykmelding);
                    setSykmeldingStatus(sykmeldingStatus);
                }
            });
        }
    }, [setSykmelding, setSykmeldingStatus, sykmeldingFetcher]);

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
