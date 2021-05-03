import { IsBoolean, IsOptional, IsString } from 'class-validator';

class MeldingTilNAV {
    @IsBoolean()
    bistandUmiddelbart: boolean;

    @IsOptional()
    @IsString()
    beskrivBistand?: string;

    constructor(data: any) {
        this.bistandUmiddelbart = data.bistandUmiddelbart;
        this.beskrivBistand = data.beskrivBistand ?? undefined;
    }
}

export default MeldingTilNAV;
