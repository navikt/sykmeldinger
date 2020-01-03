import createUseContext from 'constate';
import { useState } from 'react';

import Arbeidsgiver from '../types/arbeidsgiverTypes';
import { Status } from '../types/sykmeldingDataTypes';
import { Sykmelding } from '../types/sykmeldingTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingStatus, setSykmeldingStatus] = useState<Status | null>(null);
    const [arbeidsgivere, setArbeidsgivere] = useState<Arbeidsgiver[] | null>(null);
    const [sykmeldingUtenforVentetid, setSykmeldingUtenforVentetid] = useState<boolean | null>(null);

    return {
        sykmelding,
        setSykmelding,
        sykmeldingStatus,
        setSykmeldingStatus,
        arbeidsgivere,
        setArbeidsgivere,
        sykmeldingUtenforVentetid,
        setSykmeldingUtenforVentetid,
    };
});

export default useAppStore;
