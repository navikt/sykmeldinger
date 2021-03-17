// Made as class because dates need parsing

export class NaermesteLeder {
    aktivTom?: Date;
    aktoerId: string;
    arbeidsgiverForskuttererLoenn?: boolean;
    epost: string;
    mobil: string;
    navn: string;
    organisasjonsnavn?: string;
    orgnummer: string;

    constructor(data: any) {
        this.aktivTom = new Date(data.aktivTom);
        this.aktoerId = data.aktoerId;
        this.arbeidsgiverForskuttererLoenn = data.arbeidsgiverForskuttererLoenn;
        this.epost = data.epost;
        this.mobil = data.mobil;
        this.navn = data.navn;
        this.organisasjonsnavn = data.organisasjonsnavn;
        this.orgnummer = data.orgnummer;
    }
}

export class Arbeidsgiver {
    naermesteLeder: NaermesteLeder | null;
    navn: string;
    orgnummer: string;
    stilling: string;
    constructor(data: any) {
        this.naermesteLeder = data.naermesteLeder ? new NaermesteLeder(data.naermesteLeder) : null;
        this.navn = data.navn;
        this.orgnummer = data.orgnummer;
        this.stilling = data.stilling;
    }
}
