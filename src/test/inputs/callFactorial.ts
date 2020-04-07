import { Frag } from '../../treeTypes';

/*
let
    function fact (n : int) : int =
        if  n = 0
            then 1
            else n * fact (n - 1)
in
    fact (5)
end
*/

export const callFactorialInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: '81381766-8cd1-4358-8d2d-1c708359edec' },
                { LABEL: 'f868be12-3ffa-4406-8baa-e51ec853ba9d' },
                {
                    MOVE: [
                        { LOCAL: 'f6d26505-e635-47a7-a990-6a75781f725d' },
                        {
                            BINOP: [
                                'MUL',
                                { LOCAL: 'n' },
                                {
                                    CALL: [
                                        'fact',
                                        { NAME: '995f48f3-3993-4b63-b181-551faec87d51' },
                                        [{ BINOP: ['MINUS', { LOCAL: 'n' }, { CONST: 1 }] }],
                                    ],
                                },
                            ],
                        },
                    ],
                },
                { LABEL: '30771cf5-818f-43c7-8bea-067779a62ec3' },
                {
                    JUMP: [
                        { NAME: 'f868be12-3ffa-4406-8baa-e51ec853ba9d' },
                        ['f868be12-3ffa-4406-8baa-e51ec853ba9d'],
                    ],
                },
                { LABEL: '16ac764a-1563-4547-9dc5-37d4203b451c' },
                { MOVE: [{ LOCAL: 'f6d26505-e635-47a7-a990-6a75781f725d' }, { CONST: 1 }] },
                { LABEL: 'eeabe23a-f6ee-476b-8b98-0ff91cc99561' },
                {
                    CJUMP: [
                        'GE',
                        { BINOP: ['EQ', { LOCAL: 'n' }, { CONST: 0 }] },
                        { CONST: 1 },
                        'eeabe23a-f6ee-476b-8b98-0ff91cc99561',
                        '2b6ed0cf-f9a6-48cd-b83a-a7f11b934ff1',
                    ],
                },
                { LABEL: '2b6ed0cf-f9a6-48cd-b83a-a7f11b934ff1' },
                {
                    JUMP: [
                        { NAME: '30771cf5-818f-43c7-8bea-067779a62ec3' },
                        ['30771cf5-818f-43c7-8bea-067779a62ec3'],
                    ],
                },
                { LABEL: '51da0b72-4aa6-4d3e-97b1-a2ac246384af' },
                { EXP: { CONST: 0 } },
                { MOVE: [{ GLOBAL: 'rv' }, { LOCAL: 'f6d26505-e635-47a7-a990-6a75781f725d' }] },
                {
                    JUMP: [
                        { NAME: 'c1669c7e-afb1-434c-969e-ac24fac735e5' },
                        ['c1669c7e-afb1-434c-969e-ac24fac735e5'],
                    ],
                },
                { LABEL: 'c1669c7e-afb1-434c-969e-ac24fac735e5' },
            ],
            frame: {
                name: 'fact',
                label: '995f48f3-3993-4b63-b181-551faec87d51',
                formals: [['n', false]],
                locals: [],
                arg_index: 0,
                local_index: 0,
                mem_index: 0,
            },
        },
    },
    {
        Proc: {
            body: [
                { LABEL: '2bde3ab2-e385-4d18-83f4-bd0023bdf25c' },
                {
                    MOVE: [
                        { GLOBAL: 'rv' },
                        {
                            CALL: [
                                'fact',
                                { NAME: '995f48f3-3993-4b63-b181-551faec87d51' },
                                [{ CONST: 5 }],
                            ],
                        },
                    ],
                },
                {
                    JUMP: [
                        { NAME: '9212f2c0-0ce4-4365-9a94-02958830927e' },
                        ['9212f2c0-0ce4-4365-9a94-02958830927e'],
                    ],
                },
                { LABEL: '9212f2c0-0ce4-4365-9a94-02958830927e' },
            ],
            frame: {
                name: '_tigermain',
                label: '694c13cf-a13d-480d-b8b1-6b4d2729bc02',
                formals: [],
                locals: [],
                arg_index: 0,
                local_index: 0,
                mem_index: 0,
            },
        },
    },
];
