import 'reflect-metadata';
import { IsOptional, IsString } from 'class-validator';

class KontaktMedPasient {
    @IsOptional()
    kontaktDato?: Date;

    @IsOptional()
    @IsString()
    begrunnelseIkkeKontakt?: string;

    constructor(data: any) {
        this.kontaktDato = data.kontaktDato ? new Date(data.kontaktDato) : undefined;
        this.begrunnelseIkkeKontakt = data.begrunnelseIkkeKontakt ?? undefined;
    }
}

export default KontaktMedPasient;
