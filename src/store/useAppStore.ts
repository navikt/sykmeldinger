import createUseContext from 'constate';
import { useState } from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Status } from '../types/sykmeldingDataTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingStatus, setSykmeldingStatus] = useState<Status | null>(null);
    const [sykmeldingUtenforVentetid, setSykmeldingUtenforVentetid] = useState<boolean | null>(null);

    return {
        sykmelding,
        setSykmelding,
        sykmeldingStatus,
        setSykmeldingStatus,
        sykmeldingUtenforVentetid,
        setSykmeldingUtenforVentetid,
    };
});

export default useAppStore;
