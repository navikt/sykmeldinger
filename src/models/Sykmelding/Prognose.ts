import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

class ErIArbeid {
    @IsBoolean()
    egetArbeidPaSikt: boolean;

    @IsBoolean()
    annetArbeidPaSikt: boolean;

    @IsOptional()
    @Type(() => Date)
    arbeidFOM?: Date;

    @IsOptional()
    @Type(() => Date)
    vurderingsdato?: Date;
}

class ErIkkeIArbeid {
    @IsBoolean()
    arbeidsforPaSikt: boolean;

    @IsOptional()
    @Type(() => Date)
    arbeidsforFOM?: Date;

    @IsOptional()
    @Type(() => Date)
    vurderingsdato?: Date;
}

class Prognose {
    @IsBoolean()
    arbeidsforEtterPeriode: boolean;

    @IsOptional()
    @IsString()
    hensynArbeidsplassen?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ErIArbeid)
    erIArbeid?: ErIArbeid;

    @IsOptional()
    @ValidateNested()
    @Type(() => ErIkkeIArbeid)
    erIkkeIArbeid?: ErIkkeIArbeid;
}

export default Prognose;
