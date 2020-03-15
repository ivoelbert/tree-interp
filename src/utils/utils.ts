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

export class UnreachableError extends Error {
    constructor(msg?: string) {
        super(msg ?? 'Unreachable branch');
    }
}

export const assertExists = <T>(value: T | undefined): T => {
    if (value === undefined) {
        throw new UnexpectedUndefinedError();
    } else {
        return value;
    }
};

/**
 *  Wrapper over a Map<Object, number> to support structurally equal objects.
 *  Resorts to JSON.stringify to check structure, so it doesn't commute.
 *  If this brings bugs (quite sure it doesn't) improve the stringify logic
 */

const stringify = JSON.stringify;

export class StructuralMap<K, V> {
    private map: Map<string, V>;

    constructor(map?: Map<string, V>) {
        if (map !== undefined) {
            this.map = new Map<string, V>(map);
        } else {
            this.map = new Map<string, V>();
        }
    }

    public get = (object: K): V | undefined => {
        const stringifiedObject = stringify(object);

        return this.map.get(stringifiedObject);
    };

    public set = (object: K, value: V): StructuralMap<K, V> => {
        const stringifiedObject = stringify(object);

        this.map.set(stringifiedObject, value);

        return this;
    };

    public clone = (): StructuralMap<K, V> => {
        return new StructuralMap<K, V>(this.map);
    };
}
