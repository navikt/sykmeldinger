export enum Steg {
    FOER_DU_BEGYNNER = 'FOER_DU_BEGYNNER',
    FRAVAER_OG_FRISKMELDING = 'FRAVAER_OG_FRISKMELDING',
    AKTIVITETER_I_SYKMELDINGSPERIODEN = 'AKTIVITETER_I_SYKMELDINGSPERIODEN',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
    ETT_SPORSMAL_PER_SIDE = 'ETT_SPORSMAL_PER_SIDE',
}

const beregnSteg = (sti: string) => {
    if (sti.indexOf('oppsummering') > -1) {
        return Steg.OPPSUMMERING;
    }
    if (sti.indexOf('kvittering') > -1) {
        return Steg.KVITTERING;
    }
    if (sti.indexOf('fravaer-og-friskmelding') > -1) {
        return Steg.FRAVAER_OG_FRISKMELDING;
    }
    if (sti.indexOf('aktiviteter-i-sykmeldingsperioden') > -1) {
        return Steg.AKTIVITETER_I_SYKMELDINGSPERIODEN;
    }
    if (sti.indexOf('side') > -1) {
        return Steg.ETT_SPORSMAL_PER_SIDE;
    }
    return Steg.FOER_DU_BEGYNNER;
};

export default beregnSteg;
