import { IsIn, IsOptional, IsString } from 'class-validator';

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
    restriksjoner: (keyof typeof SvarRestriksjon)[];
}

export default UtdypendeOpplysning;
