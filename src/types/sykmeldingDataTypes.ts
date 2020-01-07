import { Sykmelding } from './sykmeldingTypes';

export class SykmeldingData {
    sykmelding: Sykmelding;
    status: StatusTyper;

    constructor(data: any) {
        this.sykmelding = data.sykmelding;
        this.status = data.status;
    }
}

export enum StatusTyper {
    NY = 'ny',
    AVVIST = 'avvist',
    AVBRUTT = 'avbrutt',
    SENDT = 'sendt',
    BEKREFTET = 'bekreftet',
}
