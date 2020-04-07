import { Frag } from '../../treeTypes';

/*
PROGRAM:

let
    var N := 42
in
    N
end
*/

export const returnVariableTestInput: Frag[] = [
    {
        Proc: {
            body: [
                { LABEL: 'd9958e4d-8075-4938-9bd3-fcaa949d24c9' },
                { MOVE: [{ LOCAL: 'N' }, { CONST: 42 }] },
                { EXP: { CONST: 0 } },
                { MOVE: [{ GLOBAL: 'rv' }, { LOCAL: 'N' }] },
                {
                    JUMP: [
                        { NAME: 'dda2e2ea-aebc-4b4a-8933-4336b1e49bce' },
                        ['dda2e2ea-aebc-4b4a-8933-4336b1e49bce'],
                    ],
                },
                { LABEL: 'dda2e2ea-aebc-4b4a-8933-4336b1e49bce' },
            ],
            frame: {
                name: '_tigermain',
                label: '29d361eb-8bca-4695-a6c0-edab959f8e28',
                formals: [],
                locals: ['N'],
                arg_index: 0,
                local_index: 0,
                mem_index: 0,
            },
        },
    },
];
