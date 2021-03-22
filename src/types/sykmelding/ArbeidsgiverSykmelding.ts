import ObjectBase from '../objectBase';

class ArbeidsgiverSykmelding extends ObjectBase<ArbeidsgiverSykmelding> {
    navn?: string;
    stillingsprosent?: number;

    constructor(data: any) {
        super(data, 'ArbeidsgiverSykmelding');

        if (this.isDefined('navn')) {
            this.navn = this.getRequiredString('navn');
        }
        if (this.isDefined('stillingsprosent')) {
            this.stillingsprosent = this.getRequiredNumber('stillingsprosent');
        }
    }
}

export default ArbeidsgiverSykmelding;
