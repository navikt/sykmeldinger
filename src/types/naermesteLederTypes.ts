export default class NaermesteLeder {
    aktivTom?: Date;
    aktoerId: string;
    arbeidsgiverForskuttererLoenn?: boolean;
    epost: string;
    mobil: string;
    navn: string;
    organisasjonsnavn?: string;
    orgnummer: string;

    constructor(data: any) {
        this.aktivTom = data.aktivTom;
        this.aktoerId = data.aktoerId;
        this.arbeidsgiverForskuttererLoenn = data.arbeidsgiverForskuttererLoenn;
        this.epost = data.epost;
        this.mobil = data.mobil;
        this.navn = data.navn;
        this.organisasjonsnavn = data.organisasjonsnavn;
        this.orgnummer = data.orgnummer;
    }
}
