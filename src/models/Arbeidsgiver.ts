import { IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { parseISO } from 'date-fns';

export class Arbeidsgiver {
    @IsString()
    readonly orgnummer: string;

    @IsString()
    readonly juridiskOrgnummer: string;

    @IsString()
    readonly navn: string;

    @IsString()
    readonly stillingsprosent: string;

    @IsString()
    readonly stilling: string;

    @IsBoolean()
    readonly aktivtArbeidsforhold: boolean;

    @IsOptional()
    @ValidateNested()
    readonly naermesteLeder?: NaermesteLeder;

    constructor(data: any) {
        this.orgnummer = data.orgnummer;
        this.juridiskOrgnummer = data.juridiskOrgnummer;
        this.navn = data.navn;
        this.stilling = data.stilling;
        this.stillingsprosent = data.stillingsprosent;
        this.aktivtArbeidsforhold = data.aktivtArbeidsforhold;
        this.naermesteLeder = data.naermesteLeder ? new NaermesteLeder(data.naermesteLeder) : undefined;
    }
}

export class NaermesteLeder {
    @IsString()
    readonly aktoerId: string;

    @IsString()
    readonly navn: string;

    @IsString()
    readonly orgnummer: string;

    @IsString()
    readonly organisasjonsnavn: string;

    @IsOptional()
    @IsString()
    readonly epost?: string;

    @IsOptional()
    @IsString()
    readonly mobil?: string;

    @IsOptional()
    @IsDate()
    readonly aktivTom?: Date;

    @IsOptional()
    @IsBoolean()
    readonly arbeidsgiverForskuttererLoenn?: boolean;

    constructor(data: any) {
        this.aktoerId = data.aktoerId;
        this.navn = data.navn;
        this.orgnummer = data.orgnummer;
        this.organisasjonsnavn = data.organisasjonsnavn;
        this.epost = data.epost;
        this.mobil = data.mobil;
        this.aktivTom = data.aktivTom ? parseISO(data.aktivTom) : undefined;
        this.arbeidsgiverForskuttererLoenn = data.arbeidsgiverForskuttererLoenn;
    }
}
