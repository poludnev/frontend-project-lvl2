import { expect, test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff from '../src/genDiff.js';

const jsonFilePath1 = ('__fixtures__/config1.json');
const jsonFilePath2 = ('__fixtures__/config2.json');
const yamlFilePath1 = ('__fixtures__/config1.yml');
const yamlFilePath2 = ('__fixtures__/config2.yaml');
const unsupportedFilePath = ('__fixtures__/unsupportedConfig.txt');

const argsTofail = [
  [jsonFilePath1, ''],
  ['', ''],
  [jsonFilePath1, jsonFilePath2, 'txt'],
  [jsonFilePath1, unsupportedFilePath],
];

test.each(argsTofail)('to-fail-case #%#', (args) => {
  expect(() => genDiff(...args)).toThrow();
});

const argsToPass = [
  {
    args: [jsonFilePath1, jsonFilePath2], expectedPath: '__fixtures__/results/stylish.txt',
  },
  {
    args: [yamlFilePath1, yamlFilePath2, 'plain'], expectedPath: '__fixtures__/results/plain.txt',
  },
  {
    args: [yamlFilePath1, jsonFilePath2, 'json'], expectedPath: '__fixtures__/results/json.txt',
  },
];

test.each(argsToPass)('to-pass-case #%# $expectedPath', ({ args, expectedPath }) => {
  const expected = readFile(expectedPath);
  expect(genDiff(...args)).toEqual(expected);
});
