import { interpreterDependenciesFactory } from './testUtils';
import { returnNumberTestInput } from './inputs/returnNumber';
import { returnVariableTestInput } from './inputs/returnVariable';

test('Basic program that returns 42 works', async () => {
    const { interpreter } = interpreterDependenciesFactory(returnNumberTestInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(42);
});

test('Define and return variable works', async () => {
    const { interpreter } = interpreterDependenciesFactory(returnVariableTestInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(42);
})