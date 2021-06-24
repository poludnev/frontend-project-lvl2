import { expect, test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => `__fixtures__/${filename}`;

const jsonFilePath1 = getFixturePath('config1.json');
const jsonFilePath2 = getFixturePath('config2.json');
const yamlFilePath1 = getFixturePath('config1.yml');
const yamlFilePath2 = getFixturePath('config2.yaml');
const unsupportedFilePath = getFixturePath('unsupportedConfig.txt');

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
    args: [jsonFilePath1, jsonFilePath2], expectedPath: getFixturePath('results/stylish.txt'),
  },
  {
    args: [yamlFilePath1, yamlFilePath2, 'plain'], expectedPath: getFixturePath('results/plain.txt'),
  },
  {
    args: [yamlFilePath1, jsonFilePath2, 'json'], expectedPath: getFixturePath('results/json.txt'),
  },
];

test.each(argsToPass)('$expectedPath', ({ args, expectedPath }) => {
  const expected = readFile(expectedPath);
  expect(genDiff(...args)).toEqual(expected);
});
