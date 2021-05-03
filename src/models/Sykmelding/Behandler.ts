import 'reflect-metadata';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

class Adresse {
    @IsOptional()
    @IsString()
    gate?: string;

    @IsOptional()
    @IsInt()
    postnummer?: number;

    @IsOptional()
    @IsString()
    kommune?: string;

    @IsOptional()
    @IsString()
    postboks?: string;

    @IsOptional()
    @IsString()
    land?: string;

    constructor(data: any) {
        this.gate = data.gate ?? undefined;
        this.postnummer = data.postnummer ?? undefined;
        this.kommune = data.kommune ?? undefined;
        this.postboks = data.postboks ?? undefined;
        this.land = data.land ?? undefined;
    }
}

class Behandler {
    @IsString()
    fornavn: string;

    @IsOptional()
    @IsString()
    mellomnavn?: string;

    @IsString()
    etternavn: string;

    @IsString()
    aktoerId: string;

    // @IsOptional()
    // @IsString()
    // hpr?: string;

    // @IsOptional()
    // @IsString()
    // her?: string;

    @ValidateNested()
    adresse: Adresse;

    @IsOptional()
    @IsString()
    tlf?: string;

    constructor(data: any) {
        this.fornavn = data.fornavn;
        this.mellomnavn = data.mellomnavn ?? undefined;
        this.etternavn = data.etternavn;
        this.aktoerId = data.aktoerId;
        this.adresse = new Adresse(data.adresse);
        this.tlf = data.tlf ?? undefined;
    }

    getName(): string {
        return `${this.fornavn}${this.mellomnavn ? ' ' + this.mellomnavn : ''} ${this.etternavn}`;
    }
}

export default Behandler;
