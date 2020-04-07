import { Frag } from '../../treeTypes';

/*
PROGRAM:

let
  function id (n : int) : int = n
in
  id (42)
end
*/

export const callIdentityInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: '68589bb7-6695-4b55-a9c8-8b129829a92b' },
                { MOVE: [{ GLOBAL: 'rv' }, { LOCAL: 'n' }] },
                {
                    JUMP: [
                        { NAME: 'd38644d3-a417-42aa-8c5b-2df58cb2d4a4' },
                        ['d38644d3-a417-42aa-8c5b-2df58cb2d4a4'],
                    ],
                },
                { LABEL: 'd38644d3-a417-42aa-8c5b-2df58cb2d4a4' },
            ],
            frame: {
                name: 'id',
                label: '6eb4dbc6-017f-407e-ae28-10714857467c',
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
                { LABEL: '3fea6151-e5e8-4496-823f-b656b8c354c8' },
                {
                    MOVE: [
                        { GLOBAL: 'rv' },
                        {
                            CALL: [
                                'id',
                                { NAME: '6eb4dbc6-017f-407e-ae28-10714857467c' },
                                [{ CONST: 42 }],
                            ],
                        },
                    ],
                },
                {
                    JUMP: [
                        { NAME: '7269dd3c-7918-4e05-814e-50021139ca37' },
                        ['7269dd3c-7918-4e05-814e-50021139ca37'],
                    ],
                },
                { LABEL: '7269dd3c-7918-4e05-814e-50021139ca37' },
            ],
            frame: {
                name: '_tigermain',
                label: 'b2c3d45a-a0ed-4eae-8d57-02601b407a82',
                formals: [],
                locals: [],
                arg_index: 0,
                local_index: 0,
                mem_index: 0,
            },
        },
    },
];
