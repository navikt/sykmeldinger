import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER,
    SKJERMET_FOR_NAV,
}

class UtdypendeOpplysning {
    @IsOptional()
    @IsString()
    sporsmal?: string;

    @IsString()
    svar: string;

    @IsIn(Object.keys(SvarRestriksjon), { each: true })
    @IsArray()
    restriksjoner: (keyof typeof SvarRestriksjon)[];

    constructor(data: any) {
        this.sporsmal = data.sporsmal ?? undefined;
        this.svar = data.svar;
        this.restriksjoner = data.restriksjoner;
    }
}

export default UtdypendeOpplysning;
