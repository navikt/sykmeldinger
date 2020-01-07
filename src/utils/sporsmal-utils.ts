import { Sykmelding } from '../types/sykmeldingTypes';

export const skalViseFrilansersporsmal = (sykmelding: Sykmelding, sykmeldingUtenforVentetid: boolean): boolean => {
    // const mulighetForArbeid = sykmelding.perioder.find(periode => !!periode.aktivitetIkkeMulig);

    // TODO: Rydd opp i (tilsynelatende) shady logikk fra sykefravear
    return !sykmeldingUtenforVentetid;
};
