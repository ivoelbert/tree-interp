import { Frag } from '../../treeTypes';

export const returnNumberTestInput: Frag[] = [
    {
        Proc: {
            body: [
                {
                    LABEL: {
                        prefix: 0,
                        offset: 68,
                    },
                },
                {
                    EXP: {
                        CONST: 42,
                    },
                },
                {
                    JUMP: [
                        {
                            NAME: {
                                prefix: 0,
                                offset: 67,
                            },
                        },
                        [
                            {
                                prefix: 0,
                                offset: 67,
                            },
                        ],
                    ],
                },
                {
                    LABEL: {
                        prefix: 0,
                        offset: 67,
                    },
                },
            ],
            frame: {
                name: '_tigermain',
                label: {
                    prefix: 0,
                    offset: 65,
                },
                formals: [],
                locals: [],
                actual_arg: 0,
                actual_local: 0,
                actual_reg: 1,
            },
        },
    },
];
