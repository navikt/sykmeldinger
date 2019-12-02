import { Sykmelding } from './sykmeldingTypes';

export class SykmeldingData {
    sykmelding: Sykmelding;
    status: Status;

    constructor(data: any) {
        this.sykmelding = data.sykmelding;
        this.status = data.status;
    }
}

export enum Status {
    NY = 'ny',
    AVVIST = 'avvist',
    AVBRUTT = 'avbrutt',
    SENDT = 'sendt',
    BEKREFTET = 'bekreftet',
}
