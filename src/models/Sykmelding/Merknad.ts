import { IsOptional, IsString } from 'class-validator';

class Merknad {
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    beskrivelse?: string;

    constructor(data: any) {
        this.type = data.type;
        this.beskrivelse = data.beskrivelse ?? undefined;
    }
}

export default Merknad;
