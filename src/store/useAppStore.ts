import createUseContext from 'constate';
import { useState } from 'react';
import NaermesteLeder from '../types/naermesteLederTypes';

const useAppStore = createUseContext(() => {
    const [sykmeldinger, setSykmeldinger] = useState<any[] | null>(null);
    const [valgtSykmelding, setValgtSykmelding] = useState<any | null>(null);
    const [naermesteLedere, setNaermesteLedere] = useState<NaermesteLeder | null>(null);

    return {
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        naermesteLedere, setNaermesteLedere,
    };
});

export default useAppStore;
