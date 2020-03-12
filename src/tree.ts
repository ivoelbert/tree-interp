export type Label = {
    prefix: number;
    offset: number;
};

// Two Labels are equal if their representation is deeply equal
export const eqLabel = (l1: Label, l2: Label): boolean => {
    return l1.offset === l2.offset && l1.prefix === l2.prefix
}

export type LocalTemp = {
    prefix: number;
    offset: number;
};

export type Temp = 'FRAME_POINTER' | 'RV' | { Local: LocalTemp };

export type Exp =
    | { CONST: number }
    | { NAME: Label }
    | { TEMP: Temp }
    | { BINOP: [BinOp, Exp, Exp] }
    | { MEM: Exp }
    | { CALL: [Exp, Exp[]] }
    | { ESEQ: [Stm, Exp] };

export enum BinOp {
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    MUL = 'MUL',
    DIV = 'DIV',
    AND = 'AND',
    OR = 'OR',
    LSHIFT = 'LSHIFT',
    RSHIFT = 'RSHIFT',
    ARSHIFT = 'ARSHIFT',
    XOR = 'XOR',
    EQ = 'EQ',
    NE = 'NE',
    LT = 'LT',
    GT = 'GT',
    LE = 'LE',
    GE = 'GE',
    ULT = 'ULT',
    ULE = 'ULE',
    UGT = 'UGT',
    UGE = 'UGE',
}

export type Stm =
    | { EXP: Exp }
    | { MOVE: [Exp, Exp] }
    | { JUMP: [Exp, Label[]] }
    | { CJUMP: [BinOp, Exp, Exp, Label, Label] }
    | { SEQ: [Stm, Stm] }
    | { LABEL: Label };

export type Frame = {
    name: Label;
    formals: boolean[];
    locals: boolean[];
    actual_arg: number;
    actual_local: number;
    actual_reg: number;
};

export type Frag =
    | { Proc: { body: Stm; frame: Frame } }
    | { ConstString: [Label, string] };

export type Fragments = {
    Ok: Frag[];
};

/*
#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub enum Exp {
    CONST(i64),
    NAME(Label),
    TEMP(Temp),
    BINOP(BinOp, Box<Exp>, Box<Exp>),
    MEM(Box<Exp>),
    CALL(Box<Exp>, Vec<Exp>),
    ESEQ(Box<Stm>, Box<Exp>)
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub enum Stm {
    EXP(Box<Exp>),
    MOVE(Box<Exp>, Box<Exp>),
    JUMP(Exp, Vec<Label>),
    CJUMP(BinOp, Exp, Exp, Label, Label),
    SEQ(Box<Stm>, Box<Stm>),
    LABEL(Label)
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub enum BinOp {
    PLUS,
    MINUS,
    MUL,
    DIV,
    AND,
    OR,
    LSHIFT,
    RSHIFT,
    ARSHIFT,
    XOR,
    EQ,
    NE,
    LT,
    GT,
    LE,
    GE,
    ULT,
    ULE,
    UGT,
    UGE
}
*/
