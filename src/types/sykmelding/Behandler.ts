import ObjectBase from '../objectBase';

class Adresse extends ObjectBase<Adresse> {
    gate?: string;
    postnummer?: number;
    kommune?: string;
    postboks?: string;
    land?: string;

    constructor(data: any) {
        super(data, 'Adresse');

        if (this.isDefined('gate')) {
            this.gate = this.getRequiredString('gate');
        }
        if (this.isDefined('postnummer')) {
            this.postnummer = this.getRequiredNumber('postnummer');
        }
        if (this.isDefined('kommune')) {
            this.kommune = this.getRequiredString('kommune');
        }
        if (this.isDefined('postboks')) {
            this.postboks = this.getRequiredString('postboks');
        }
        if (this.isDefined('land')) {
            this.land = this.getRequiredString('land');
        }
    }
}

class Behandler extends ObjectBase<Behandler> {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktoerId: string;
    fnr: string;
    hpr?: string;
    her?: string;
    adresse: Adresse;
    tlf?: string;

    constructor(data: any) {
        super(data, 'Behandler');

        this.fornavn = this.getRequiredString('fornavn');
        if (this.isDefined('mellomnavn')) {
            this.mellomnavn = this.getRequiredString('mellomnavn');
        }
        this.etternavn = this.getRequiredString('etternavn');
        this.aktoerId = this.getRequiredString('aktoerId');
        this.fnr = this.getRequiredString('fnr');
        if (this.isDefined('hpr')) {
            this.hpr = this.getRequiredString('hpr');
        }
        if (this.isDefined('her')) {
            this.her = this.getRequiredString('her');
        }
        this.adresse = new Adresse(data.adresse);
        if (this.isDefined('tlf')) {
            this.tlf = this.getRequiredString('tlf');
        }
    }
}

export default Behandler;
