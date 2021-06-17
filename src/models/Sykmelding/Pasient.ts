import { IsOptional, IsString } from 'class-validator';

class Pasient {
    @IsOptional()
    @IsString()
    readonly fnr?: string;

    @IsOptional()
    @IsString()
    readonly fornavn?: string;

    @IsOptional()
    @IsString()
    readonly mellomnavn?: string;

    @IsOptional()
    @IsString()
    readonly etternavn?: string;

    constructor(data: any) {
        this.fnr = data.fnr ?? undefined;
        this.fornavn = data.fornavn ?? undefined;
        this.mellomnavn = data.mellomnavn ?? undefined;
        this.etternavn = data.etternavn ?? undefined;
    }

    getName(): string | undefined {
        if (!this.fornavn) return undefined;

        return `${this.fornavn}${this.mellomnavn ? ' ' + this.mellomnavn : ''}${
            this.etternavn ? ' ' + this.etternavn : ''
        }`;
    }
}

export default Pasient;
