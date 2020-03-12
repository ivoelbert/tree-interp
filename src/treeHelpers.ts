import { Label, Frag, FunFrag, StringFrag } from './treeTypes';

// Two Labels are equal if their representation is deeply equal
export const eqLabel = (l1: Label, l2: Label): boolean => {
    return l1.offset === l2.offset && l1.prefix === l2.prefix;
};

export const isFunFrag = (fragment: Frag): fragment is FunFrag => {
    return 'Proc' in fragment;
};

export const isStringFrag = (fragment: Frag): fragment is StringFrag => {
    return 'ConstString' in fragment;
};

export const findFunction = (funFragments: FunFrag[], name: Label): FunFrag => {
    const foundFragment = funFragments.find(frag =>
        eqLabel(frag.Proc.frame.name, name)
    );

    // The function must exist, otherwise kill the interpreter gracefully.
    // Consider taking a debugging argument to log along this message
    if (foundFragment === undefined) {
        throw new Error(`Function under label ${labelToName(name)} not found!`);
    }

    return foundFragment;
};

/**
 * Mock a Label from a name, necessary for now.
 */
export const labelFromName = (name: string): Label => ({
    prefix: 0,
    offset: 38597705,
});

export const labelToName = (label: Label): string => {
    return JSON.stringify(label);
};
