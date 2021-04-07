import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

class KontaktMedPasient {
    @IsOptional()
    @Type(() => Date)
    kontaktMedPasient?: Date;

    @IsOptional()
    @IsString()
    begrunnelseIkkeKontakt?: string;
}

export default KontaktMedPasient;
