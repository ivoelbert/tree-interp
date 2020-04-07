import { Exp } from './treeTypes';

export const WORD_SZ = 4;

const inGlobalAccessExp = (name: string): Exp => ({
    GLOBAL: name,
});

const inLocalAccessExp = (name: string): Exp => ({
    LOCAL: name,
});

// For now, all formals go in memory
const accessExpFromFormal = (formal: [string, boolean]): Exp => {
    const [name, escapes] = formal;
    if (escapes) {
        return inGlobalAccessExp(name);
    } else {
        return inLocalAccessExp(name);
    }
};

export const accessExpsFromFormals = (formals: [string, boolean][]): Exp[] => {
    return formals.map(accessExpFromFormal);
};
