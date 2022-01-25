import 'reflect-metadata';
import { IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { parseISO } from 'date-fns';

class ErIArbeid {
    @IsBoolean()
    egetArbeidPaSikt: boolean;

    @IsBoolean()
    annetArbeidPaSikt: boolean;

    @IsOptional()
    @IsDate()
    arbeidFOM?: Date;

    @IsOptional()
    @IsDate()
    vurderingsdato?: Date;

    constructor(data: any) {
        this.egetArbeidPaSikt = data.egetArbeidPaSikt;
        this.annetArbeidPaSikt = data.annetArbeidPaSikt;
        this.arbeidFOM = data.arbeidFOM ? parseISO(data.arbeidFOM) : undefined;
        this.vurderingsdato = data.vurderingsdato ? parseISO(data.vurderingsdato) : undefined;
    }
}

class ErIkkeIArbeid {
    @IsBoolean()
    arbeidsforPaSikt: boolean;

    @IsOptional()
    @IsDate()
    arbeidsforFOM?: Date;

    @IsOptional()
    @IsDate()
    vurderingsdato?: Date;

    constructor(data: any) {
        this.arbeidsforPaSikt = data.arbeidsforPaSikt;
        this.arbeidsforFOM = data.arbeidsforFOM ? parseISO(data.arbeidsforFOM) : undefined;
        this.vurderingsdato = data.vurderingsdato ? parseISO(data.vurderingsdato) : undefined;
    }
}

class Prognose {
    @IsBoolean()
    arbeidsforEtterPeriode: boolean;

    @IsOptional()
    @IsString()
    hensynArbeidsplassen?: string;

    @IsOptional()
    @ValidateNested()
    erIArbeid?: ErIArbeid;

    @IsOptional()
    @ValidateNested()
    erIkkeIArbeid?: ErIkkeIArbeid;

    constructor(data: any) {
        this.arbeidsforEtterPeriode = data.arbeidsforEtterPeriode;
        this.hensynArbeidsplassen = data.hensynArbeidsplassen ?? undefined;
        this.erIArbeid = data.erIArbeid ? new ErIArbeid(data.erIArbeid) : undefined;
        this.erIkkeIArbeid = data.erIkkeIArbeid ? new ErIkkeIArbeid(data.erIkkeIArbeid) : undefined;
    }
}

export default Prognose;
