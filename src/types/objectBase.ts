import dayjs from 'dayjs';

class ObjectBase<T> {
    private data: any;

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

    getRequiredArrayOfEnumKeys<EnumT>(e: EnumT, prop: keyof T): Array<keyof EnumT> {
        const enumKeys = Object.keys(e);
        const unknownArray = this.getRequiredArray(prop);
        unknownArray.forEach((maybeEnumKey) => {
            this.assert(
                typeof maybeEnumKey === 'string',
                `Arrayvalue ${typeof maybeEnumKey} in property ${prop} is not assignable to type string`,
            );
            this.assert(
                enumKeys.includes(maybeEnumKey),
                `Arrayvalue ${typeof maybeEnumKey} in property ${prop} is not assignable to key of enum type`,
            );
        });
        return unknownArray as Array<keyof EnumT>;
    }

    getRequiredArray(prop: keyof T): Array<unknown> {
        const maybeArray = this.data[prop];
        this.assert(
            Array.isArray(maybeArray),
            `Property ${prop} of type ${typeof maybeArray} is not assignable to type array`,
        );
        return maybeArray;
    }

    getRequiredString(prop: keyof T): string {
        const maybeStr = this.data[prop];
        this.assert(
            typeof maybeStr === 'string',
            `Property ${prop} of type ${typeof maybeStr} is not assignable to type string`,
        );
        return maybeStr;
    }

    getRequiredNumber(prop: keyof T): number {
        const maybeNumber = this.data[prop];
        this.assert(
            typeof maybeNumber === 'number',
            `Property ${prop} of type ${typeof maybeNumber} is not assignable to type number`,
        );
        return maybeNumber;
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

    getRequiredStringAsEnumKey<K>(e: K, prop: keyof T): keyof K {
        const maybeEnumKey = this.data[prop];
        this.assert(
            typeof maybeEnumKey === 'string',
            `Property ${prop} of type ${typeof maybeEnumKey} is not assignable as enum key`,
        );
        this.assert(
            Object.keys(e).includes(maybeEnumKey),
            `Could not match any enum key to property ${prop} with value ${maybeEnumKey}`,
        );
        // TODO: see if this can be typesafe
        return maybeEnumKey as keyof K;
    }
}

export default ObjectBase;
