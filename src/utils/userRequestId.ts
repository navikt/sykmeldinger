import { v4 as uuidv4 } from 'uuid';

let userRequestId: string | undefined;

export function getUserRequestId(): string {
    if (!userRequestId) {
        userRequestId = uuidv4();
    }
    return userRequestId;
}
