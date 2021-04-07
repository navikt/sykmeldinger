import { IsOptional, IsString } from 'class-validator';

class Merknad {
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    beskrivelse?: string;
}

export default Merknad;
