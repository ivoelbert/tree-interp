import { Frag } from '../../treeTypes';

/*
PROGRAM:

42
*/

export const returnNumberTestInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: 'bc704a77-3b4a-4e10-a602-aeb24a65b176' },
                { MOVE: [{ GLOBAL: 'rv' }, { CONST: 42 }] },
                {
                    JUMP: [
                        { NAME: 'fb1fd49d-481e-43cd-a1cb-ab147cbbc807' },
                        ['fb1fd49d-481e-43cd-a1cb-ab147cbbc807'],
                    ],
                },
                { LABEL: 'fb1fd49d-481e-43cd-a1cb-ab147cbbc807' },
            ],
            frame: {
                name: '_tigermain',
                label: 'f7f48d4c-3128-4c87-a15c-23f9ebb83e78',
                formals: [],
                locals: [],
                arg_index: 0,
                local_index: 0,
                mem_index: 0,
            },
        },
    },
];
