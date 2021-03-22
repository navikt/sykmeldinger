import ObjectBase from '../objectBase';

class MeldingTilNAV extends ObjectBase<MeldingTilNAV> {
    bistandUmiddelbart: boolean;
    beskrivBistand?: string;

    constructor(data: any) {
        super(data, 'MeldingTilNAV');
        this.bistandUmiddelbart = this.getRequiredBoolean('bistandUmiddelbart');
        if (this.isDefined('beskrivBistand')) {
            this.beskrivBistand = this.getRequiredString('beskrivBistand');
        }
    }
}

export default MeldingTilNAV;
