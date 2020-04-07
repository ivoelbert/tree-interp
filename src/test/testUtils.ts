import { MockConsole } from './mockConsole';
import { Runtime } from '../runtime';
import { MemMap } from '../utils/memMap';
import { Label, Frag } from '../treeTypes';
import { StringStorage } from '../utils/stringStorage';
import { TreeInterpreter } from '../interpreter';

interface RuntimeTestDependencies {
    memMap: MemMap;
    labels: Map<Label, number>;
    stringStorage: StringStorage;
    customConsole: MockConsole;
    runtime: Runtime;
}

export const runtimeDependenciesFactory = (): RuntimeTestDependencies => {
    const memMap = new MemMap();
    const labels = new Map<Label, number>();
    const stringStorage = new StringStorage(memMap, labels);
    const console = new MockConsole();
    const runtime = new Runtime(memMap, stringStorage, console);

    return {
        memMap,
        labels,
        stringStorage,
        customConsole: console,
        runtime,
    };
};

interface InterpreterTestDependencies {
    interpreter: TreeInterpreter;
    console: MockConsole;
}

export const interpreterDependenciesFactory = (input: Frag[]): InterpreterTestDependencies => {
    const console = new MockConsole();
    const interpreter = new TreeInterpreter(input, console);

    return {
        interpreter,
        console,
    };
};
