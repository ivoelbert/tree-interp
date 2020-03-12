import { Exp, Temp, Frag, FunFrag, StringFrag, Label } from './treeTypes';
import {
    isFunFrag,
    isStringFrag,
    findFunction,
    labelFromName,
    TempMap,
} from './treeHelpers';
import { NotImplementedError, assertExists } from './utils';

const FRAME_POINTER_OFFSET = 1024 * 1024;

export class TreeInterpreter {
    private funFrags: FunFrag[];
    private stringFrags: StringFrag[];

    // Map Temps to values
    private temps: TempMap;

    // Map memory location to values
    private mem: Map<number, number>;

    constructor(fragments: Frag[]) {
        this.temps = new TempMap();
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

        // Store the Temps, so when we come out of this function we can restore them
        const tempsToRestore = this.temps.clone();

        // Move the frame pointer register like... A lot.
        const prevFp = assertExists(this.temps.get('FRAME_POINTER'));
        this.temps.set('FRAME_POINTER', prevFp - FRAME_POINTER_OFFSET);

        // Set up the formals

        // Ejecutar con todo seteado

        // Restore the Temps
        this.temps = tempsToRestore;

        throw new NotImplementedError();
    };

    private evalExp = (exp: Exp): number => {
        throw new NotImplementedError();
    };
}
