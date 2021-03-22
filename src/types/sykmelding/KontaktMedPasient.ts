import ObjectBase from '../objectBase';

class KontaktMedPasient extends ObjectBase<KontaktMedPasient> {
    kontaktMedPasient?: Date;
    begrunnelseIkkeKontakt?: string;

    constructor(data: any) {
        super(data, 'KontaktMedPasient');
        if (this.isDefined('kontaktMedPasient')) {
            this.kontaktMedPasient = this.getRequiredDate('kontaktMedPasient');
        }
        if (this.isDefined('begrunnelseIkkeKontakt')) {
            this.begrunnelseIkkeKontakt = this.getRequiredString('begrunnelseIkkeKontakt');
        }
    }
}

export default KontaktMedPasient;
