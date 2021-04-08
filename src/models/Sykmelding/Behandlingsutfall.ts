import { Type } from 'class-transformer';
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
}

class Behandlingsutfall {
    @IsIn(Object.keys(RegelStatus))
    status: keyof typeof RegelStatus;

    @ValidateNested({
        each: true,
    })
    @Type(() => Regelinfo)
    ruleHits: Regelinfo[];
}

export default Behandlingsutfall;
