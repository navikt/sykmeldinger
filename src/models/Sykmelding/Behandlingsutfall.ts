import { IsIn, IsString, ValidateNested } from 'class-validator';

export enum RegelStatus {
    OK = 'OK',
    MANUAL_PROCESSING = 'MANUAL_PROCESSING',
    INVALID = 'INVALID',
}

class Regelinfo {
    @IsString()
    messageForSender: string;

    @IsString()
    messageForUser: string;

    @IsString()
    ruleName: string;

    @IsIn(Object.keys(RegelStatus))
    ruleStatus: keyof typeof RegelStatus;

    constructor(data: any) {
        this.messageForSender = data.messageForSender;
        this.messageForUser = data.messageForUser;
        this.ruleName = data.ruleName;
        this.ruleStatus = data.ruleStatus;
    }
}

class Behandlingsutfall {
    @IsIn(Object.keys(RegelStatus))
    status: keyof typeof RegelStatus;

    @ValidateNested({
        each: true,
    })
    ruleHits: Regelinfo[];

    constructor(data: any) {
        this.status = data.status;
        this.ruleHits = data.ruleHits.map((ruleHit: any) => new Regelinfo(ruleHit));
    }
}

export default Behandlingsutfall;
