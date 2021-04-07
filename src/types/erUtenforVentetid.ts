import { IsBoolean } from 'class-validator';

class ErUtenforVentetid {
    @IsBoolean()
    readonly erUtenforVentetid: boolean;
}

export default ErUtenforVentetid;
