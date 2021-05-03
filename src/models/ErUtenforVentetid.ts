import { IsBoolean, IsDate, IsOptional } from 'class-validator';

class ErUtenforVentetid {
    @IsBoolean()
    readonly erUtenforVentetid: boolean;

    @IsOptional()
    @IsDate()
    readonly oppfolgingsdato?: Date;

    constructor(data: any) {
        this.erUtenforVentetid = data.erUtenforVentetid;
        this.oppfolgingsdato = data.oppfolgingsdato ? new Date(data.oppfolgingsdato) : undefined;
    }
}

export default ErUtenforVentetid;
