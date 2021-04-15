import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

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
    @Type(() => NaermesteLeder)
    readonly naermesteLeder?: NaermesteLeder;

    /**
     * Get the name of the arbeisgiver.
     * "(aktiv)" is appended if the prop aktivtArbeidsforhold is true
     * @return {string} The name
     */
    getName(): string {
        return `${this.navn}${this.aktivtArbeidsforhold ? ' (aktiv)' : ''}`;
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
    @Type(() => Date)
    readonly aktivTom?: Date;

    @IsOptional()
    @IsBoolean()
    readonly arbeidsgiverForskuttererLoenn?: boolean;
}
