import { Exp, Temp, Frag, FunFrag, StringFrag, Label } from './treeTypes';
import {
    isFunFrag,
    isStringFrag,
    findFunction,
    labelFromName,
} from './treeHelpers';
import { NotImplementedError } from './utils';

export class TreeInterpreter {
    private funFrags: FunFrag[];
    private stringFrags: StringFrag[];

    // Map Temps to values
    private temps: Map<Temp, number>;

    // Map memory location to values
    private mem: Map<number, number>;

    constructor(fragments: Frag[]) {
        this.temps = new Map();
        this.mem = new Map();

        this.funFrags = fragments.filter(isFunFrag);
        this.stringFrags = fragments.filter(isStringFrag);
    }

    public run = (): number => {
        // A program starts by calling the function _tigermain
        const mainLabel = labelFromName('_tigermain');
        return this.evalFunction(mainLabel, []);
    };

    private evalFunction = (name: Label, args: number[]): number => {
        // Find the function and extract it's body and frame.
        const fragment = findFunction(this.funFrags, name);
        const { body, frame } = fragment.Proc;

        throw new NotImplementedError();
    };

    private evalExp = (exp: Exp): number => {
        throw new NotImplementedError();
    };
}
