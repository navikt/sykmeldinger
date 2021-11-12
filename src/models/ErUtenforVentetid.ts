import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { parseISO } from 'date-fns';

class ErUtenforVentetid {
    @IsBoolean()
    readonly erUtenforVentetid: boolean;

    @IsOptional()
    @IsDate()
    readonly oppfolgingsdato?: Date;

    constructor(data: any) {
        this.erUtenforVentetid = data.erUtenforVentetid;
        this.oppfolgingsdato = data.oppfolgingsdato ? parseISO(data.oppfolgingsdato) : undefined;
    }
}

export default ErUtenforVentetid;
