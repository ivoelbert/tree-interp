export class NotImplementedError extends Error {
    constructor() {
        super('Not implemented!');
    }
}

export class UnexpectedUndefinedError extends Error {
    constructor() {
        super('Unexpected undefined value!');
    }
}

export const assertExists = <T>(value: T | undefined): T => {
    if (value === undefined) {
        throw new UnexpectedUndefinedError();
    } else {
        return value;
    }
};
