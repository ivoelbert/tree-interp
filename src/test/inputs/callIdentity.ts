import { Frag, BinOp } from '../../treeTypes';

export const callIdentityInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: { prefix: 0, offset: 217 } },
                { MOVE: [{ TEMP: 'RV' }, { TEMP: { Local: { prefix: 0, offset: 215 } } }] },
                { JUMP: [{ NAME: { prefix: 0, offset: 216 } }, [{ prefix: 0, offset: 216 }]] },
                { LABEL: { prefix: 0, offset: 216 } },
            ],
            frame: {
                name: 'id',
                label: { prefix: 0, offset: 213 },
                formals: [false],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
    {
        Proc: {
            body: [
                { LABEL: { prefix: 0, offset: 219 } },
                {
                    MOVE: [
                        { TEMP: 'RV' },
                        {
                            CALL: [
                                'id',
                                { NAME: { prefix: 0, offset: 213 } },
                                [
                                    {
                                        MEM: {
                                            BINOP: [
                                                BinOp.PLUS,
                                                {
                                                    MEM: {
                                                        BINOP: [
                                                            BinOp.PLUS,
                                                            { TEMP: 'FRAME_POINTER' },
                                                            { CONST: 1337 },
                                                        ],
                                                    },
                                                },
                                                { CONST: 1337 },
                                            ],
                                        },
                                    },
                                    { CONST: 42 },
                                ],
                            ],
                        },
                    ],
                },
                { JUMP: [{ NAME: { prefix: 0, offset: 218 } }, [{ prefix: 0, offset: 218 }]] },
                { LABEL: { prefix: 0, offset: 218 } },
            ],
            frame: {
                name: '_tigermain',
                label: { prefix: 0, offset: 211 },
                formals: [],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
];
