import { Arbeidsgiver } from './arbeidsgiver';
import ObjectBase from './objectBase';

class Brukerinformasjon extends ObjectBase<Brukerinformasjon> {
    readonly diskresjonskode: boolean;
    readonly arbeidsgivere: Arbeidsgiver[];

    constructor(data: any) {
        super(data, 'Brukerinformasjon');

        this.diskresjonskode = this.getRequiredBoolean('diskresjonskode');
        this.arbeidsgivere = this.getRequiredArray('arbeidsgivere').map((ag) => new Arbeidsgiver(ag));
    }
}

export default Brukerinformasjon;
