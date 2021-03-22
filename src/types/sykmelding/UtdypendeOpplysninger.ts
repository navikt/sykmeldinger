import ObjectBase from '../objectBase';

enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER,
    SKJERMET_FOR_NAV,
}
class UtdypendeOpplysning extends ObjectBase<UtdypendeOpplysning> {
    sporsmal?: string;
    svar: string;
    restriksjoner: (keyof typeof SvarRestriksjon)[];

    constructor(data: any) {
        super(data, 'UtdypendeOpplysning');

        if (this.isDefined('sporsmal')) {
            this.sporsmal = this.getRequiredString('sporsmal');
        }
        this.svar = this.getRequiredString('svar');
        this.restriksjoner = this.getRequiredArrayOfEnumKeys(SvarRestriksjon, 'restriksjoner');
    }
}

export default UtdypendeOpplysning;
