import { Label, FunFrag, Stm, BinOp } from '../treeTypes';
import { isLabelStm } from './stmPatterns';
import { UnreachableError } from './utils';

// Two Labels are equal if their representation is deeply equal
export const eqLabel = (l1: Label, l2: Label): boolean => {
    return l1.offset === l2.offset && l1.prefix === l2.prefix;
};

export const findLabelIndex = (stms: Stm[], label: Label): number => {
    const foundIndex = stms.findIndex(stm => {
        return isLabelStm(stm) && eqLabel(stm.LABEL, label);
    });

    if (foundIndex === -1) {
        throw new Error(`Could not find label '${label}'!`);
    }

    return foundIndex;
};

export const evalBinop = (op: BinOp, leftVal: number, rightVal: number): number => {
    switch (op) {
        case BinOp.PLUS:
            return leftVal + rightVal;

        case BinOp.MINUS:
            return leftVal - rightVal;

        case BinOp.MUL:
            return leftVal * rightVal;

        case BinOp.DIV:
            return leftVal / rightVal;

        case BinOp.AND:
            return leftVal && rightVal;

        case BinOp.OR:
            return leftVal || rightVal;

        case BinOp.LSHIFT:
            return leftVal << rightVal;

        case BinOp.RSHIFT:
            return leftVal >>> rightVal;

        case BinOp.ARSHIFT:
            return leftVal >> rightVal;

        case BinOp.XOR:
            return leftVal ^ rightVal;

        case BinOp.EQ:
            return Number(leftVal === rightVal);

        case BinOp.NE:
            return Number(leftVal !== rightVal);

        case BinOp.LT:
            return Number(leftVal < rightVal);

        case BinOp.GT:
            return Number(leftVal > rightVal);

        case BinOp.LE:
            return Number(leftVal <= rightVal);

        case BinOp.GE:
            return Number(leftVal >= rightVal);

        case BinOp.ULT:
            // Not sure, our parser doesn't even generate this
            return Number(leftVal < rightVal);

        case BinOp.ULE:
            // Not sure, our parser doesn't even generate this
            return Number(leftVal <= rightVal);

        case BinOp.UGT:
            // Not sure, our parser doesn't even generate this
            return Number(leftVal > rightVal);

        case BinOp.UGE:
            // Not sure, our parser doesn't even generate this
            return Number(leftVal >= rightVal);

        default:
            throw new UnreachableError();
    }
};
