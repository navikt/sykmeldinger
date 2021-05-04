import { IsInt, IsOptional, IsString } from 'class-validator';

class ArbeidsgiverSykmelding {
    @IsOptional()
    @IsString()
    navn?: string;

    @IsOptional()
    @IsInt()
    stillingsprosent?: number;

    constructor(data: any) {
        this.navn = data.navn ?? undefined;
        this.stillingsprosent = data.stillingsprosent ?? undefined;
    }
}

export default ArbeidsgiverSykmelding;
