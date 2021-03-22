import ObjectBase from '../objectBase';

class ErIArbeid extends ObjectBase<ErIArbeid> {
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date;
    vurderingsdato?: Date;

    constructor(data: any) {
        super(data, 'ErIArbeid');
        this.egetArbeidPaSikt = this.getRequiredBoolean('egetArbeidPaSikt');
        this.annetArbeidPaSikt = this.getRequiredBoolean('annetArbeidPaSikt');
        if (this.isDefined('arbeidFOM')) {
            this.arbeidFOM = this.getRequiredDate('arbeidFOM');
        }
        if (this.isDefined('vurderingsdato')) {
            this.vurderingsdato = this.getRequiredDate('vurderingsdato');
        }
    }
}

class ErIkkeIArbeid extends ObjectBase<ErIkkeIArbeid> {
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsdato?: Date;

    constructor(data: any) {
        super(data, 'ErIkkeIArbeid');
        this.arbeidsforPaSikt = this.getRequiredBoolean('arbeidsforPaSikt');
        if (this.isDefined('arbeidsforFOM')) {
            this.arbeidsforFOM = this.getRequiredDate('arbeidsforFOM');
        }
        if (this.isDefined('vurderingsdato')) {
            this.vurderingsdato = this.getRequiredDate('vurderingsdato');
        }
    }
}

class Prognose extends ObjectBase<Prognose> {
    arbeidsforEtterPeriode: boolean;
    hensynArbeidsplassen?: string;
    erIArbeid?: ErIArbeid;
    erIkkeIArbeid?: ErIkkeIArbeid;

    constructor(data: any) {
        super(data, 'Prognose');
        this.arbeidsforEtterPeriode = this.getRequiredBoolean('arbeidsforEtterPeriode');
        if (this.isDefined('hensynArbeidsplassen')) {
            this.hensynArbeidsplassen = this.getRequiredString('hensynArbeidsplassen');
        }
        if (this.isDefined('erIArbeid')) {
            this.erIArbeid = new ErIArbeid(data.erIArbeid);
        }
        if (this.isDefined('erIkkeIArbeid')) {
            this.erIkkeIArbeid = new ErIkkeIArbeid(data.erIkkeIArbeid);
        }
    }
}

export default Prognose;
