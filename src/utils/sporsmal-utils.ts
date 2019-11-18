import { Sykmelding } from '../types/sykmeldingTypes';

export const skalViseFrilansersporsmal = (sykmelding: Sykmelding, sykmeldingUtenforVentetid: boolean): boolean => {
    const mulighetForArbeid = sykmelding.perioder.find(periode => !!periode.aktivitetIkkeMulig);

    return !sykmeldingUtenforVentetid; // midlertidig
    // rydd opp i shady logikk fra sykefravaer
};
