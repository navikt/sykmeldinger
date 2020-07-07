export type Soknadsstatus =
    | 'NY'
    | 'SENDT'
    | 'FREMTIDIG'
    | 'UTKAST_TIL_KORRIGERING'
    | 'KORRIGERT'
    | 'AVBRUTT'
    | 'SLETTET'
    | 'UTGAATT';

export class Soknad {
    id: string;
    sykmeldingId: string;
    status: Soknadsstatus;
    fom?: Date;
    tom?: Date;

    constructor(data: any) {
        this.id = data.id;
        this.sykmeldingId = data.sykmeldingId;
        this.status = data.status;
        this.fom = data.fom ? new Date(data.fom) : undefined;
        this.tom = data.tom ? new Date(data.tom) : undefined;
    }
}
