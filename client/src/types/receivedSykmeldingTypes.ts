import { StatusTyper, Sykmelding } from './sykmeldingTypes';

export class ReceivedSykmelding {
    status: StatusTyper;
    sykmelding: Sykmelding;
    constructor(receivedSykmelding: any) {
        this.status = StatusTyper[receivedSykmelding.status as keyof typeof StatusTyper];
        this.sykmelding = new Sykmelding(receivedSykmelding.sykmelding);
    }
}
