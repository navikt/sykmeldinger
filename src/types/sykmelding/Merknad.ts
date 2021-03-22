import ObjectBase from '../objectBase';

class Merknad extends ObjectBase<Merknad> {
    type: string;
    beskrivelse?: string;

    constructor(data: any) {
        super(data, 'Merknad');
        this.type = this.getRequiredString('type');
        if (this.isDefined('beskrivelse')) {
            this.beskrivelse = this.getRequiredString('beskrivelse');
        }
    }
}

export default Merknad;
