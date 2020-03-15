import { Exp, BinOp, MemExp, TempExp } from './treeTypes';

const WORD_SZ = 4;
const ARGS_GAP = WORD_SZ;
const ARGS_INITIAL_LOCATION = 0;

const inMemAccessExpFromLocation = (location: number): Exp => ({
    MEM: {
        BINOP: [
            BinOp.PLUS,
            {
                TEMP: 'FRAME_POINTER',
            },
            {
                CONST: location,
            },
        ],
    },
});

// For now, all formals go in memory
const accessExpFromFormal = (doesFormalEscape: boolean, idx: number): Exp => {
    return inMemAccessExpFromLocation(ARGS_INITIAL_LOCATION + idx * ARGS_GAP);
};

export const accessExpsFromFormals = (formals: boolean[]): Exp[] => {
    return formals.map(accessExpFromFormal);
};
