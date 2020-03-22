import { Frag } from '../../treeTypes';

export const returnVariableTestInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: { prefix: 0, offset: 212 } },
                { MOVE: [{ TEMP: { Local: { prefix: 0, offset: 210 } } }, { CONST: 42 }] },
                { EXP: { CONST: 0 } },
                { EXP: { TEMP: { Local: { prefix: 0, offset: 210 } } } },
                { JUMP: [{ NAME: { prefix: 0, offset: 211 } }, [{ prefix: 0, offset: 211 }]] },
                { LABEL: { prefix: 0, offset: 211 } },
            ],
            frame: {
                name: '_tigermain',
                label: { prefix: 0, offset: 208 },
                formals: [],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
];
