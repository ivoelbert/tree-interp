import { Label, FunFrag, Stm } from '../treeTypes';
import { isLabelStm } from './stmPatterns';

// Two Labels are equal if their representation is deeply equal
export const eqLabel = (l1: Label, l2: Label): boolean => {
    return l1.offset === l2.offset && l1.prefix === l2.prefix;
};

export const findFunction = (funFragments: FunFrag[], name: string): FunFrag => {
    const foundFragment = funFragments.find(frag => frag.Proc.frame.name === name);

    // The function must exist, otherwise kill the interpreter gracefully.
    // Consider taking a debugging argument to log along this message
    if (foundFragment === undefined) {
        throw new Error(`Function under label '${name}' not found!`);
    }

    return foundFragment;
};

export const findLabelIndex = (stms: Stm[], label: Label): number => {
    const foundIndex = stms.findIndex(stm => {
        return isLabelStm(stm) && eqLabel(stm.LABEL, label);
    });

    if (foundIndex === -1) {
        throw new Error(`Could not find label '${label}'!`);
    }

    return foundIndex;
};
