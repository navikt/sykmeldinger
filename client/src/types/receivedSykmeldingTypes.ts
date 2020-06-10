import { StatusTyper, Sykmelding } from './sykmeldingTypes';

export class ReceivedSykmelding {
    status: StatusTyper;
    sykmelding: Sykmelding;
    constructor(receivedSykmelding: any) {
        this.status = receivedSykmelding.status;
        this.sykmelding = new Sykmelding(receivedSykmelding.sykmelding);
    }
}
