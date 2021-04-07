import { IsBoolean, IsOptional, IsString } from 'class-validator';

class MeldingTilNAV {
    @IsBoolean()
    bistandUmiddelbart: boolean;

    @IsOptional()
    @IsString()
    beskrivBistand?: string;
}

export default MeldingTilNAV;
