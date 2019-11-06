import createUseContext from 'constate';
import { useState } from 'react';
import NaermesteLeder from '../types/naermesteLederTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<any | null>(null);
    const [naermesteLedere, setNaermesteLedere] = useState<NaermesteLeder | null>(null);

    return {
        sykmelding,
        setSykmelding,
        naermesteLedere,
        setNaermesteLedere,
    };
});

export default useAppStore;
