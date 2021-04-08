import { IsNumber, IsOptional, IsString } from 'class-validator';

class ArbeidsgiverSykmelding {
    @IsOptional()
    @IsString()
    navn?: string;

    @IsOptional()
    @IsNumber()
    stillingsprosent?: number;
}

export default ArbeidsgiverSykmelding;
