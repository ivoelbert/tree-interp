import { Frag } from '../../treeTypes';

export const returnVariableTestInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: { prefix: 0, offset: 93 } },
                { MOVE: [{ TEMP: { Local: { prefix: 0, offset: 91 } } }, { CONST: 42 }] },
                { EXP: { CONST: 0 } },
                { MOVE: [{ TEMP: 'RV' }, { TEMP: { Local: { prefix: 0, offset: 91 } } }] },
                { JUMP: [{ NAME: { prefix: 0, offset: 92 } }, [{ prefix: 0, offset: 92 }]] },
                { LABEL: { prefix: 0, offset: 92 } },
            ],
            frame: {
                name: '_tigermain',
                label: { prefix: 0, offset: 89 },
                formals: [],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
];
