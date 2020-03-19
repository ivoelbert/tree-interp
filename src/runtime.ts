import { MemMap } from './utils/memMap';
import { assertExists } from './utils/utils';
import { WORD_SZ } from './frame';
import { StringStorage } from './utils/stringStorage';
import { CustomConsole } from './utils/console';

/**
 *  RUNTIME FUNCTIONS:
 *
 *  Public. This can be used by any user program:
 *  - print
 *  - flush
 *  - getchar
 *  - ord
 *  - chr
 *  - size
 *  - substring
 *  - concat
 *  - not
 *
 *  Private. This are called from the generated code.
 *  - +alloc_array
 *  - +alloc_record
 *  - +str_equals
 *  - +str_not_equals
 *  - +str_less
 *  - +str_less_or_equals
 *  - +str_greater
 *  - +str_greater_or_equals
 */

type RuntimeFunction = (args: number[]) => number;
type AsyncRuntimeFunction = (args: number[]) => Promise<number>;

export class Runtime {
    private nameMap: Map<string, RuntimeFunction | AsyncRuntimeFunction>;

    constructor(
        private memMap: MemMap,
        private stringStorage: StringStorage,
        private console: CustomConsole
    ) {
        this.nameMap = new Map();

        /**
         *  Public functions
         */
        this.nameMap.set('print', this.print);
        this.nameMap.set('flush', this.flush);
        this.nameMap.set('getchar', this.getchar);
        this.nameMap.set('ord', this.ord);
        this.nameMap.set('chr', this.chr);
        this.nameMap.set('size', this.size);
        this.nameMap.set('substring', this.substring);
        this.nameMap.set('concat', this.concat);
        this.nameMap.set('not', this.not);

        /**
         *  Internal functions
         */
        this.nameMap.set('+alloc_array', this.allocArray);
        this.nameMap.set('+alloc_record', this.allocRecord);
        this.nameMap.set('+str_equals', this.strEquals);
        this.nameMap.set('+str_not_equals', this.strNotEquals);
        this.nameMap.set('+str_less', this.strLess);
        this.nameMap.set('+str_less_or_equals', this.strLessOrEquals);
        this.nameMap.set('+str_greater', this.strGreater);
        this.nameMap.set('+str_greater_or_equals', this.strGreaterOrEquals);
    }

    getFunction = (name: string): RuntimeFunction | AsyncRuntimeFunction | undefined => {
        return this.nameMap.get(name);
    };

    /**
     *  Public functions
     */

    private print: RuntimeFunction = args => {
        const [strPointer] = args;
        assertExists(strPointer);

        const str = this.stringStorage.loadString(strPointer);
        this.console.print(str);

        return 0;
    };

    private flush: RuntimeFunction = args => {
        return 0;
    };

    private getchar: AsyncRuntimeFunction = async args => {
        const str = await this.console.read();
        return this.stringStorage.storeUnlabeledString(str);
    };

    private ord: RuntimeFunction = args => {
        const [strPointer] = args;
        assertExists(strPointer);

        const str = this.stringStorage.loadString(strPointer);

        return str.charCodeAt(0);
    };

    private chr: RuntimeFunction = args => {
        const [charCode] = args;
        assertExists(charCode);

        const str = String.fromCharCode(charCode);
        return this.stringStorage.storeUnlabeledString(str);
    };

    private size: RuntimeFunction = args => {
        const [strPointer] = args;
        assertExists(strPointer);

        const str = this.stringStorage.loadString(strPointer);
        return str.length;
    };

    private substring: RuntimeFunction = args => {
        const [strPointer, start, count] = args;
        assertExists(strPointer);

        const str = this.stringStorage.loadString(strPointer);
        const slicedStr = str.slice(start, count);

        return this.stringStorage.storeUnlabeledString(slicedStr);
    };

    private concat: RuntimeFunction = args => {
        const [leftStrPointer, rightStrPointer] = args;
        assertExists(leftStrPointer);
        assertExists(rightStrPointer);

        const leftStr = this.stringStorage.loadString(leftStrPointer);
        const rightStr = this.stringStorage.loadString(rightStrPointer);
        const newStr = leftStr + rightStr;

        return this.stringStorage.storeUnlabeledString(newStr);
    };

    private not: RuntimeFunction = args => {
        const [value] = args;
        assertExists(value);

        return Number(!value);
    };

    /**
     *  Internal functions
     */

    private allocArray: RuntimeFunction = args => {
        const [size, init] = args;
        assertExists(size);
        assertExists(init);

        const arrayLocation = this.memMap.alloc(size);

        // TODO INITIALIZE MEMORY
        for (let i = 0; i < size; i++) {
            const itemLocation = arrayLocation + i * WORD_SZ;

            this.memMap.set(itemLocation, init);
        }

        return arrayLocation;
    };

    private allocRecord: RuntimeFunction = args => {
        const [size, ...values] = args;
        assertExists(size);

        const recordLocation = this.memMap.alloc(size);

        for (let i = 0; i < size; i++) {
            const itemLocation = recordLocation + i * WORD_SZ;
            const item = assertExists(values[i]);

            this.memMap.set(itemLocation, item);
        }

        return recordLocation;
    };

    private strEquals: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison === 0);
    };

    private strNotEquals: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison !== 0);
    };

    private strLess: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison < 0);
    };

    private strLessOrEquals: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison <= 0);
    };

    private strGreater: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison > 0);
    };

    private strGreaterOrEquals: RuntimeFunction = args => {
        const comparison = this.strCompare(args);
        return Number(comparison >= 0);
    };

    // extracts the strings and returns their localCompare
    private strCompare: RuntimeFunction = args => {
        const [leftStrPointer, rightStrPointer] = args;

        const leftStr = this.stringStorage.loadString(assertExists(leftStrPointer));
        const rightStr = this.stringStorage.loadString(assertExists(rightStrPointer));

        return leftStr.localeCompare(rightStr);
    };
}
