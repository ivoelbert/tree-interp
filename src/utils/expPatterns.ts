import { Exp, MemExp, TempExp, ConstExp, NameExp, BinopExp, CallExp, EseqExp } from '../treeTypes';

export const isConstExp = (exp: Exp): exp is ConstExp => {
    return 'CONST' in exp;
};

export const isNameExp = (exp: Exp): exp is NameExp => {
    return 'NAME' in exp;
};

export const isTempExp = (exp: Exp): exp is TempExp => {
    return 'TEMP' in exp;
};

export const isBinopExp = (exp: Exp): exp is BinopExp => {
    return 'BINOP' in exp;
};

export const isMemExp = (exp: Exp): exp is MemExp => {
    return 'MEM' in exp;
};

export const isCallExp = (exp: Exp): exp is CallExp => {
    return 'CALL' in exp;
};

export const isEseqExp = (exp: Exp): exp is EseqExp => {
    return 'ESEQ' in exp;
};
