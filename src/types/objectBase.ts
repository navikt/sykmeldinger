import dayjs from 'dayjs';

class ObjectBase<T> {
    data: any;

    constructor(data: any, constructorName: string) {
        this.assert(
            typeof data === 'object',
            `Data of type ${typeof data} passed to ${constructorName} constructor is not assignable to type "object"`,
        );
        this.data = data;
    }

    // Will infer the condition on the property that is tested
    assert(condition: any, msg: string): asserts condition {
        if (!condition) {
            throw new TypeError(msg);
        }
    }

    isDefined(prop: keyof T): boolean {
        const value = this.data[prop];
        if (value === undefined || value === null) {
            return false;
        }
        return true;
    }

    getRequiredString(prop: keyof T): string {
        const maybeStr = this.data[prop];
        this.assert(
            typeof maybeStr === 'string',
            `Property ${prop} of type ${typeof maybeStr} is not assignable to type string`,
        );
        return maybeStr;
    }

    getRequiredBoolean(prop: keyof T): boolean {
        const maybeBoolean = this.data[prop];
        this.assert(
            typeof maybeBoolean === 'boolean',
            `Property ${prop} of type ${typeof maybeBoolean} is not assignable to type boolean`,
        );
        return maybeBoolean;
    }

    getRequiredDate(prop: keyof T): Date {
        const maybeDateString = this.data[prop];
        this.assert(
            typeof maybeDateString === 'string',
            `Property ${prop} of type ${typeof maybeDateString} can not be parsed as date`,
        );
        this.assert(
            dayjs(maybeDateString).isValid(),
            `Property ${prop} with value ${maybeDateString} is not a valid date`,
        );
        return new Date(maybeDateString);
    }

    // getObject(prop: keyof T): unknown {
    //     const maybeObj = this.data[prop];
    //     this.assert(typeof maybeObj === 'object', `Missing required property ${prop}`);
    //     return maybeObj;
    // }
}

export default ObjectBase;
