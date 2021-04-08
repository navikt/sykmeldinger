import { Type } from 'class-transformer';
import { IsBoolean, ValidateNested } from 'class-validator';
import { Arbeidsgiver } from './Arbeidsgiver';

class Brukerinformasjon {
    @IsBoolean()
    readonly strengtFortroligAdresse: boolean;

    @ValidateNested({ each: true })
    @Type(() => Arbeidsgiver)
    readonly arbeidsgivere: Arbeidsgiver[];
}

export default Brukerinformasjon;
