import { v4 as uuidv4 } from 'uuid';

let userTraceId: string | undefined;

export function getUserTraceId(): string {
    if (!userTraceId) {
        userTraceId = uuidv4();
    }
    return userTraceId;
}
