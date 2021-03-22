import ObjectBase from '../objectBase';

export enum RegelStatus {
    OK,
    MANUAL_PROCESSING,
    INVALID,
}

class Regelinfo extends ObjectBase<Regelinfo> {
    messageForSender: string;
    messageForUser: string;
    ruleName: string;
    ruleStatus?: keyof typeof RegelStatus;

    constructor(data: any) {
        super(data, 'Regelinfo');

        this.messageForSender = this.getRequiredString('messageForSender');
        this.messageForUser = this.getRequiredString('messageForUser');
        this.ruleName = this.getRequiredString('ruleName');
        if (this.isDefined('ruleStatus')) {
            this.ruleStatus = this.getRequiredStringAsEnumKey(RegelStatus, 'ruleStatus');
        }
    }
}

class Behandlingsutfall extends ObjectBase<Behandlingsutfall> {
    status: keyof typeof RegelStatus;
    ruleHits: Regelinfo[];

    constructor(data: any) {
        super(data, 'Behandlingsutfall');

        this.status = this.getRequiredStringAsEnumKey(RegelStatus, 'status');
        this.ruleHits = this.getRequiredArray('ruleHits').map((ruleHit) => new Regelinfo(ruleHit));
    }
}

export default Behandlingsutfall;
