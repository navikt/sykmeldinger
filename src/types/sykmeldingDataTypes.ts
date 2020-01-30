import { Status, Sykmelding } from './sykmeldingTypes';

export class SykmeldingData {
    sykmelding: Sykmelding;
    status: Status;

    constructor(data: any) {
        this.sykmelding = data.sykmelding;
        this.status = data.status;
    }
}

export class StatusData {
    status: string;
    dato?: string;
    datoBekreftet?: string;
    sykmeldtFra?: string;
    arbeidsgiver?: string;
    organisasjonsnummer?: string;

    constructor(data: any) {
        this.status = data.status;
        this.dato = data.dato;
        this.datoBekreftet = data.datoBekreftet;
        this.sykmeldtFra = data.sykmeldtFra;
        this.arbeidsgiver = data.arbeidsgiver;
        this.organisasjonsnummer = data.organisasjonsnummer;
    }
}
