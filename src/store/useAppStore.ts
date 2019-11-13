import createUseContext from 'constate';
import { useState } from 'react';
import NaermesteLeder from '../types/naermesteLederTypes';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Status } from '../types/sykmeldingDataTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingStatus, setSykmeldingStatus] = useState<Status | null>(null);
    const [naermesteLedere, setNaermesteLedere] = useState<NaermesteLeder | null>(null);

    return {
        sykmelding,
        setSykmelding,
        sykmeldingStatus,
        setSykmeldingStatus,
        naermesteLedere,
        setNaermesteLedere,
    };
});

export default useAppStore;
