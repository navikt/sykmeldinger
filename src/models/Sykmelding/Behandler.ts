import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class Adresse {
    @IsOptional()
    @IsString()
    gate?: string;

    @IsOptional()
    @IsNumber()
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

    @IsString()
    fnr: string;

    @IsOptional()
    @IsString()
    hpr?: string;

    @IsOptional()
    @IsString()
    her?: string;

    @ValidateNested()
    @Type(() => Adresse)
    adresse: Adresse;

    @IsOptional()
    @IsString()
    tlf?: string;
}

export default Behandler;
