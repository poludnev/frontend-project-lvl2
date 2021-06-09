import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import { expect, test } from '@jest/globals';
import formatter from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishResult = fs.readFileSync(getFixturePath('results/stylish.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('results/plain.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('results/json.txt'), 'utf-8');

const jsonFilePath2 = getFixturePath('config2.json');
const jsonFilePath1 = getFixturePath('config1.json');
const yamlFilePath1 = getFixturePath('config1.yml');
const yamlFilePath2 = getFixturePath('config2.yaml');
const unsupportedFilePath = getFixturePath('unsupportedConfig.txt');

const argsTofail = [
  [jsonFilePath1, ''],
  ['', ''],
  [jsonFilePath1, jsonFilePath2, 'txt'],
  [jsonFilePath1, unsupportedFilePath],
];

test.each(argsTofail)('name0', (args) => {
  expect(() => formatter(...args)).toThrow();
});

const argsToPass = [
  {
    args: [jsonFilePath1, jsonFilePath2], expected: stylishResult,
  },
  {
    args: [yamlFilePath1, yamlFilePath2, 'plain'], expected: plainResult,
  },
  {
    args: [yamlFilePath1, jsonFilePath2, 'json'], expected: jsonResult,
  },
];

test.each(argsToPass)('name', ({ args, expected }) => {
  expect(formatter(...args)).toEqual(expected);
});
