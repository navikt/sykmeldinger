import { Arbeidsgiver } from './arbeidsgiver';
import ObjectBase from './objectBase';

class Brukerinformasjon extends ObjectBase<Brukerinformasjon> {
    readonly diskresjonskode: boolean;
    readonly arbeidsgivere: Arbeidsgiver[];

    constructor(data: any) {
        super(data, 'Brukerinformasjon');

        this.diskresjonskode = this.getRequiredBoolean('diskresjonskode');

        this.assert(Array.isArray(data.arbeidsgivere), 'Property arbeidsgivere is not of type Array');
        this.arbeidsgivere = data.arbeidsgivere.map((ag: unknown) => new Arbeidsgiver(ag));
    }
}

export default Brukerinformasjon;
