import { Fragments, Exp, Temp } from './tree';

const TEMPS: Map<Temp, number> = new Map();
const MEM: Map<number, number> = new Map();

const evalExp = (exp: Exp): number => {
    return undefined;
};

const evalFunction = (name: string, args: number[]): number => {
    return undefined;
};

export const interp = (fragments: Fragments): number => {
    return evalFunction('_tigermain', []);
};
