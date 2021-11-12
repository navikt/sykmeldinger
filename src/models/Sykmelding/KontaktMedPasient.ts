import 'reflect-metadata';
import { IsOptional, IsString } from 'class-validator';
import { parseISO } from 'date-fns';

class KontaktMedPasient {
    @IsOptional()
    kontaktDato?: Date;

    @IsOptional()
    @IsString()
    begrunnelseIkkeKontakt?: string;

    constructor(data: any) {
        this.kontaktDato = data.kontaktDato ? parseISO(data.kontaktDato) : undefined;
        this.begrunnelseIkkeKontakt = data.begrunnelseIkkeKontakt ?? undefined;
    }
}

export default KontaktMedPasient;
