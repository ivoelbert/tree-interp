import { Exp, Frag, FunFrag, Stm, Label, Temp } from './treeTypes';
import { NotImplementedError, assertExists, UnreachableError, StructuralMap } from './utils/utils';
import { accessExpsFromFormals } from './frame';
import { findLabelIndex, evalBinop } from './utils/treeUtils';
import { isFunFrag, isStringFrag } from './utils/fragPatterns';
import {
    isMemExp,
    isTempExp,
    isConstExp,
    isNameExp,
    isBinopExp,
    isCallExp,
    isEseqExp,
} from './utils/expPatterns';
import {
    isExpStm,
    isMoveStm,
    isJumpStm,
    isCjumpStm,
    isSeqStm,
    isLabelStm,
} from './utils/stmPatterns';
import { MemMap } from './utils/memMap';
import { StringStorage } from './utils/stringStorage';
import { CustomConsole } from './utils/console';
import { Runtime } from './runtime';

const FRAME_POINTER_OFFSET = 1024 * 1024;

/**
 *  TODO:
 *  - runtime functions
 *  - rest of evalExp
 */
export class TreeInterpreter {
    // Map Temps to values
    private temps: StructuralMap<Temp, number>;

    // Map Labels to mem locations
    private labels: StructuralMap<Label, number>;

    // Map memory location to values
    private mem: MemMap;

    // String storage
    private stringStorage: StringStorage;

    // Fragments corresponding to functions.
    private functions: Map<string, FunFrag>;

    // Provides runtime functions
    private runtime: Runtime;

    constructor(fragments: Frag[], private console: CustomConsole) {
        this.temps = new StructuralMap();
        this.labels = new StructuralMap();
        this.mem = new MemMap();
        this.stringStorage = new StringStorage(this.mem, this.labels);
        this.functions = new Map();

        fragments.filter(isFunFrag).forEach(frag => {
            this.functions.set(frag.Proc.frame.name, frag);
        });

        fragments.filter(isStringFrag).forEach(frag => {
            this.stringStorage.storeString(frag);
        });

        this.runtime = new Runtime(this.mem, this.stringStorage, this.console);
    }

    public run = async (): Promise<number> => {
        // A program starts by calling the function _tigermain
        const mainLabel = '_tigermain';
        return await this.evalFunction(mainLabel, []);
    };

    private evalFunction = async (name: string, args: number[]): Promise<number> => {
        // Find the function and extract it's body and frame.
        const fragment = assertExists(this.functions.get(name));
        const { body, frame } = fragment.Proc;

        // Store the Temps, so when we come out of this function we can restore them
        const tempsToRestore = this.temps.clone();

        // Move the frame pointer register like... A lot.
        const prevFp = assertExists(this.temps.get('FRAME_POINTER'));
        this.temps.set('FRAME_POINTER', prevFp - FRAME_POINTER_OFFSET);

        // Set up the formals so we can exec the body
        await this.setupFormals(args, frame.formals);

        // The machine state is ready to run the body, do it.
        await this.execStms(body);

        // Restore the Temps
        this.temps = tempsToRestore;

        throw new NotImplementedError();
    };

    /**
     *  Execute stms in order, there may be internal jumps
     *  to previous or following stms. This can loop forever!
     */
    private execStms = async (stms: Stm[]): Promise<void> => {
        // Start executing the first stm
        let executedStmIndex = 0;

        while (executedStmIndex < stms.length) {
            const stm = stms[executedStmIndex];

            // Evaluate the current stm
            const maybeLabel: Label | null = await this.evalStm(stm);

            // Find the next stm to evaluate
            if (maybeLabel === null) {
                // If no jump continue executing the next stm
                executedStmIndex++;
            } else {
                // We've got a label, find the corresponding stm and continue executing from there
                const nextStmIndex = findLabelIndex(stms, maybeLabel);
                executedStmIndex = nextStmIndex;
            }
        }
    };

    // Store each value from args in the corresponding temp/mem location
    private setupFormals = async (args: number[], formals: boolean[]): Promise<void> => {
        const accessExps = accessExpsFromFormals(formals);

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const access = accessExps[i];

            if (isMemExp(access)) {
                // Evaluate the memory location and store the arg there
                const memLocation = await this.evalExp(access.MEM);
                this.mem.set(memLocation, arg);
            } else if (isTempExp(access)) {
                // Store the argument in the corresponding temp
                const temp = access.TEMP;
                this.temps.set(temp, arg);
            } else {
                // The access can be either MEM or TEMP.
                throw new UnreachableError();
            }
        }
    };

    /**
     *  Evaluate a Stm.
     *  Return a Label if we need to jump somewhere, null otherwise
     */
    private evalStm = async (stm: Stm): Promise<Label | null> => {
        if (isExpStm(stm)) {
            await this.evalExp(stm.EXP);
            return null;
        }

        if (isMoveStm(stm)) {
            const [toExp, fromExp] = stm.MOVE;
            if (isTempExp(toExp)) {
                const temp: Temp = toExp.TEMP;
                const value: number = await this.evalExp(fromExp);

                this.temps.set(temp, value);
                return null;
            }
            if (isMemExp(toExp)) {
                const location: number = await this.evalExp(toExp.MEM);
                const value: number = await this.evalExp(fromExp);

                this.mem.set(location, value);
                return null;
            }

            throw new UnreachableError(`MOVE to a non Temp nor Mem expression\n${toExp}\n`);
        }

        if (isJumpStm(stm)) {
            const [where] = stm.JUMP;
            if (isNameExp(where)) {
                return where.NAME;
            }

            throw new UnreachableError(`JUMP to a non-Label expression:\n${where}\n`);
        }

        if (isCjumpStm(stm)) {
            const [exp, labelTrue, labelFalse] = stm.CJUMP;

            // 0 means false, everything else means true.
            const condition = await this.evalExp(exp);
            return condition === 0 ? labelFalse : labelTrue;
        }

        if (isSeqStm(stm)) {
            throw new UnreachableError('Found SEQ, not a canonical tree!');
        }

        if (isLabelStm(stm)) {
            return null;
        }

        // No more cases
        throw new UnreachableError();
    };

    /**
     *  Evaluate an Exp.
     *  Every exp evaluates to a number.
     */
    private evalExp = async (exp: Exp): Promise<number> => {
        if (isConstExp(exp)) {
            return exp.CONST;
        }

        if (isNameExp(exp)) {
            return assertExists(this.labels.get(exp.NAME));
        }

        if (isTempExp(exp)) {
            return assertExists(this.temps.get(exp.TEMP));
        }

        if (isBinopExp(exp)) {
            const [op, leftExp, rightExp] = exp.BINOP;

            const leftVal = await this.evalExp(leftExp);
            const rightVal = await this.evalExp(rightExp);

            return evalBinop(op, leftVal, rightVal);
        }

        if (isMemExp(exp)) {
            const dir = await this.evalExp(exp.MEM);
            return assertExists(this.mem.get(dir));
        }

        if (isCallExp(exp)) {
            const [name, labelExp, args] = exp.CALL;
            const evaluatedArgs = await Promise.all(args.map(this.evalExp));

            let returnValue: number;
            const runtimeFunction = this.runtime.getFunction(name);
            if (runtimeFunction !== undefined) {
                returnValue = await runtimeFunction(evaluatedArgs);
            } else {
                returnValue = await this.evalFunction(name, evaluatedArgs);
            }

            this.temps.set('RV', returnValue);

            return returnValue;
        }

        if (isEseqExp(exp)) {
            throw new UnreachableError('Found ESEQ, not a canonical tree!');
        }

        // No more cases
        throw new UnreachableError();
    };
}
