import { Arbeidsgiver } from './arbeidsgiver';

class Brukerinformasjon {
    diskresjonskode: boolean;
    arbeidsgivere: Arbeidsgiver[];

    constructor(data: any) {
        if (typeof data === 'object') {
            if (typeof data.diskresjonskode === 'boolean' && Array.isArray(data.arbeidsgivere)) {
                this.diskresjonskode = data.diskresjonskode;
            } else {
                throw new TypeError('Property "diskresjonskode" is not of expected type "boolean"');
            }
            if (Array.isArray(data.arbeidsgivere)) {
                this.arbeidsgivere = data.arbeidsgivere.map((ag: unknown) => new Arbeidsgiver(ag));
            } else {
                throw new TypeError('Property "arbeidsgivere" is not an array');
            }
        } else {
            throw new TypeError('Brukerinformasjon is null');
        }
    }
}

export default Brukerinformasjon;
