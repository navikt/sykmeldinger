import ObjectBase from './objectBase';

export class Arbeidsgiver extends ObjectBase<Arbeidsgiver> {
    readonly orgnummer: string;
    readonly juridiskOrgnummer: string;
    readonly navn: string;
    readonly stillingsprosent: string;
    readonly stilling: string;
    readonly aktivtArbeidsforhold: boolean;
    readonly naermesteLeder?: NaermesteLeder;

    constructor(data: any) {
        super(data, 'Arbeidsgiver');

        this.orgnummer = this.getRequiredString('orgnummer');
        this.juridiskOrgnummer = this.getRequiredString('juridiskOrgnummer');
        this.navn = this.getRequiredString('navn');
        this.stillingsprosent = this.getRequiredString('stillingsprosent');
        this.stilling = this.getRequiredString('stilling');
        this.aktivtArbeidsforhold = this.getRequiredBoolean('aktivtArbeidsforhold');

        if (this.isDefined(data.naermesteLeder)) {
            this.naermesteLeder = new NaermesteLeder(data.naermesteLeder);
        }
    }
}

export class NaermesteLeder extends ObjectBase<NaermesteLeder> {
    readonly aktoerId: string;
    readonly navn: string;
    readonly orgnummer: string;
    readonly organisasjonsnavn: string;
    readonly epost?: string;
    readonly mobil?: string;
    readonly aktivTom?: Date;
    readonly arbeidsgiverForskuttererLoenn?: boolean;

    constructor(data: any) {
        super(data, 'NaermesteLeder');

        this.aktoerId = this.getRequiredString('aktoerId');
        this.navn = this.getRequiredString('navn');
        this.orgnummer = this.getRequiredString('orgnummer');
        this.organisasjonsnavn = this.getRequiredString('organisasjonsnavn');
        if (this.isDefined('epost')) {
            this.epost = this.getRequiredString('epost');
        }
        if (this.isDefined('mobil')) {
            this.epost = this.getRequiredString('mobil');
        }
        if (this.isDefined('aktivTom')) {
            this.aktivTom = this.getRequiredDate('aktivTom');
        }
        if (this.isDefined('arbeidsgiverForskuttererLoenn')) {
            this.arbeidsgiverForskuttererLoenn = this.getRequiredBoolean('arbeidsgiverForskuttererLoenn');
        }
    }
}
