export type Label = {
    prefix: number;
    offset: number;
};

export type LocalTemp = {
    prefix: number;
    offset: number;
};

export type Temp = 'FRAME_POINTER' | 'RV' | { Local: LocalTemp };

export type ConstExp = { CONST: number };
export type NameExp = { NAME: Label };
export type TempExp = { TEMP: Temp };
export type BinopExp = { BINOP: [BinOp, Exp, Exp] };
export type MemExp = { MEM: Exp };
export type CallExp = { CALL: [string, Exp, Exp[]] };
export type EseqExp = { ESEQ: [Stm, Exp] };

export type Exp = ConstExp | NameExp | TempExp | BinopExp | MemExp | CallExp | EseqExp;

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

export type ExpStm = { EXP: Exp };
export type MoveStm = { MOVE: [Exp, Exp] };
export type JumpStm = { JUMP: [Exp, Label[]] };
export type CjumpStm = { CJUMP: [Exp, Label, Label] };
export type SeqStm = { SEQ: [Stm, Stm] };
export type LabelStm = { LABEL: Label };

export type Stm = ExpStm | MoveStm | JumpStm | CjumpStm | SeqStm | LabelStm;

export type Frame = {
    name: string;
    label: Label;
    formals: boolean[];
    locals: boolean[];
    actual_arg: number;
    actual_local: number;
    actual_reg: number;
};

export type FunFrag = {
    Proc: {
        body: Stm[];
        frame: Frame;
    };
};

export type StringFrag = {
    ConstString: [Label, string];
};

export type Frag = FunFrag | StringFrag;

export type CanonizedFragments = Frag[];

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
