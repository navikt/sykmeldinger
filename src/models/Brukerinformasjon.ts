import { IsArray, IsBoolean, ValidateNested } from 'class-validator';

import { Arbeidsgiver } from './Arbeidsgiver';

class Brukerinformasjon {
    @IsBoolean()
    readonly strengtFortroligAdresse: boolean;

    @ValidateNested({ each: true })
    @IsArray()
    readonly arbeidsgivere: Arbeidsgiver[];

    constructor(data: any) {
        this.strengtFortroligAdresse = data.strengtFortroligAdresse;
        this.arbeidsgivere = data.arbeidsgivere.map((ag: any) => new Arbeidsgiver(ag));
    }
}

export default Brukerinformasjon;
