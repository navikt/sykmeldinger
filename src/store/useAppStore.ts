import createUseContext from 'constate';
import { useState } from 'react';
import NaermesteLeder from '../types/naermesteLederTypes';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Status } from '../types/sykmeldingDataTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingType, setSykmeldingType] = useState<Status | null>(null);
    const [naermesteLedere, setNaermesteLedere] = useState<NaermesteLeder | null>(null);

    return {
        sykmelding,
        setSykmelding,
        sykmeldingType,
        setSykmeldingType,
        naermesteLedere,
        setNaermesteLedere,
    };
});

export default useAppStore;
