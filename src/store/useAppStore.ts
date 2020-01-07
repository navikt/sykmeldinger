import createUseContext from 'constate';
import { useState } from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { StatusTyper } from '../types/sykmeldingDataTypes';
import Arbeidsgiver from '../types/arbeidsgiverTypes';

const useAppStore = createUseContext(() => {
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [sykmeldingStatus, setSykmeldingStatus] = useState<StatusTyper | null>(null);
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
