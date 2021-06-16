import path from 'path';
import { fileURLToPath } from 'url';

import { expect, test } from '@jest/globals';
import readFile from '../src/fileReader.js';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

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
    args: [jsonFilePath1, jsonFilePath2], expectedPath: 'results/stylish.txt',
  },
  {
    args: [yamlFilePath1, yamlFilePath2, 'plain'], expectedPath: 'results/plain.txt',
  },
  {
    args: [yamlFilePath1, jsonFilePath2, 'json'], expectedPath: 'results/json.txt',
  },
];

test.each(argsToPass)('to-pass-case #%#', ({ args, expectedPath }) => {
  const expected = readFile(getFixturePath(expectedPath));
  expect(genDiff(...args)).toEqual(expected);
});
