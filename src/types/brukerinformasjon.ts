import { Arbeidsgiver } from './arbeidsgiver';
import ObjectBase from './objectBase';

class Brukerinformasjon extends ObjectBase<Brukerinformasjon> {
    readonly strengtFortroligAdresse: boolean;
    readonly arbeidsgivere: Arbeidsgiver[];

    constructor(data: any) {
        super(data, 'Brukerinformasjon');

        this.strengtFortroligAdresse = this.getRequiredBoolean('strengtFortroligAdresse');
        this.arbeidsgivere = this.getRequiredArray('arbeidsgivere').map((ag) => new Arbeidsgiver(ag));
    }
}

export default Brukerinformasjon;
