import NaermesteLeder from './naermesteLederTypes';

export default class Arbeidsgiver {
    naermesteLeder: NaermesteLeder;
    navn: string;
    orgnummer: string;
    stilling: string;
    constructor(data: any) {
        this.naermesteLeder = new NaermesteLeder(data.naermesteLeder);
        this.navn = data.navn;
        this.orgnummer = data.orgnummer;
        this.stilling = data.stilling;
    }
}
