import { Frag } from '../../treeTypes';

export const returnNumberTestInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: { prefix: 0, offset: 163 } },
                { MOVE: [{ TEMP: 'RV' }, { CONST: 42 }] },
                { JUMP: [{ NAME: { prefix: 0, offset: 162 } }, [{ prefix: 0, offset: 162 }]] },
                { LABEL: { prefix: 0, offset: 162 } },
            ],
            frame: {
                name: '_tigermain',
                label: { prefix: 0, offset: 160 },
                formals: [],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
];
