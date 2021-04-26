import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

class ErUtenforVentetid {
    @IsBoolean()
    readonly erUtenforVentetid: boolean;

    @IsOptional()
    @Type(() => Date)
    readonly oppfolgingsdato?: Date;
}

export default ErUtenforVentetid;
