import { interpreterDependenciesFactory } from './testUtils';
import { returnNumberTestInput } from './inputs/returnNumber';
import { returnVariableTestInput } from './inputs/returnVariable';
import { callIdentityInput } from './inputs/callIdentity';
import { callFactorialInput } from './inputs/callFactorial';

test('Basic program that returns 42 works', async () => {
    const { interpreter } = interpreterDependenciesFactory(returnNumberTestInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(42);
});

test('Define and return variable works', async () => {
    const { interpreter } = interpreterDependenciesFactory(returnVariableTestInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(42);
});

test('Calling the identity function works', async () => {
    const { interpreter } = interpreterDependenciesFactory(callIdentityInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(42);
});

test('Calling the factorial function works', async () => {
    const { interpreter } = interpreterDependenciesFactory(callFactorialInput);
    const returnValue = await interpreter.run();

    expect(returnValue).toBe(120);
});
