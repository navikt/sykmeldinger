import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFetch, {
    isNotStarted,
    FetchState,
    hasData,
    isAnyNotStartedOrPending,
    hasAnyFailed,
    isPending,
} from '../hooks/useFetch';
import useAppStore from '../store/useAppStore';
import { Sykmelding } from '../types/sykmeldingTypes';
import { SykmeldingData, Status } from '../types/sykmeldingDataTypes';

const DataFetcher = (props: { children: any }) => {
    const {
        sykmelding,
        sykmeldingStatus,
        setSykmelding,
        setSykmeldingStatus,
        setSykmeldingUtenforVentetid,
    } = useAppStore();
    const sykmeldingFetcher = useFetch<SykmeldingData>();
    const sykmeldingUtenforVentetidFetcher = useFetch<boolean>();

    useEffect(() => {
        if (isNotStarted(sykmeldingFetcher)) {
            sykmeldingFetcher.fetch('/syforest/sykmelding', undefined, (fetchState: FetchState<SykmeldingData>) => {
                if (hasData(fetchState)) {
                    const { data } = fetchState;
                    const sykmelding = new Sykmelding(data.sykmelding);
                    const sykmeldingStatus = data.status;
                    setSykmelding(sykmelding);
                    setSykmeldingStatus(sykmeldingStatus);

                    // Dersom sykmeldingen er ny skal den berikes
                    if (sykmeldingStatus === Status.NY) {
                        sykmeldingUtenforVentetidFetcher.fetch(
                            `/syforest/sykmeldinger/${sykmelding.id}/actions/erUtenforVentetid`,
                            { method: 'POST' },
                            (fetchState: FetchState<boolean>) => {
                                if (hasData(fetchState)) {
                                    setSykmeldingUtenforVentetid(fetchState.data);
                                }
                            },
                        );
                    }
                }
            });
        }
    }, [
        setSykmeldingUtenforVentetid,
        setSykmelding,
        setSykmeldingStatus,
        sykmelding,
        sykmeldingFetcher,
        sykmeldingStatus,
        sykmeldingUtenforVentetidFetcher,
    ]);

    if (isAnyNotStartedOrPending([sykmeldingFetcher]) || isPending(sykmeldingUtenforVentetidFetcher)) {
        return <Spinner />;
    }

    if (hasAnyFailed([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher])) {
        return (
            <AlertStripeFeil>
                Det oppsto feil ved henting av data. Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        );
    }
    return props.children;
};

export default DataFetcher;
