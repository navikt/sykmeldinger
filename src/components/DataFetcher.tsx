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
import ErUtenforVentetidData from '../types/erUtenforVentetidTypes';
import Arbeidsgiver from '../types/arbeidsgiverTypes';

const DataFetcher = (props: { children: any }) => {
    const { setSykmelding, setSykmeldingStatus, setArbeidsgivere, setSykmeldingUtenforVentetid } = useAppStore();
    const sykmeldingFetcher = useFetch<SykmeldingData>();
    const arbeidsgivereFetcher = useFetch<Arbeidsgiver[]>();
    const sykmeldingUtenforVentetidFetcher = useFetch<ErUtenforVentetidData>();

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
                            (fetchState: FetchState<ErUtenforVentetidData>) => {
                                if (hasData(fetchState)) {
                                    console.log(fetchState);
                                    setSykmeldingUtenforVentetid(fetchState.data.erUtenforVentetid);
                                }
                            },
                        );
                        arbeidsgivereFetcher.fetch(
                            `/syforest/informasjon/arbeidsgivere?sykmeldingId=${sykmelding.id}`,
                            undefined,
                            (fetchState: FetchState<Arbeidsgiver[]>) => {
                                if (hasData(fetchState)) {
                                    const { data } = fetchState;
                                    const arbeidsgivere = data.map(ag => new Arbeidsgiver(ag));
                                    setArbeidsgivere(arbeidsgivere);
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
        sykmeldingFetcher,
        sykmeldingUtenforVentetidFetcher,
        arbeidsgivereFetcher,
        setArbeidsgivere,
    ]);

    if (isAnyNotStartedOrPending([sykmeldingFetcher, sykmeldingUtenforVentetidFetcher, arbeidsgivereFetcher])) {
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
