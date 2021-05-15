import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import {
  beforeAll, expect, test,
} from '@jest/globals';
import parse from '../src/parse.js';
import formatter from '../src/formatter';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const stylishResult = fs.readFileSync(getFixturePath('results/stylish.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('results/plain.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('results/json.txt'), 'utf-8');
const diffResult = JSON.parse(fs.readFileSync(getFixturePath('results/diffResult.txt'), 'utf-8'));

// let jsonFilePath1;
// let jsonFilePath2;
// let yamlFilePath1;
// let yamlFilePath2;
// let emptyJSONFile;
// let parsedConfig1;
// let parsedConfig2;
// let jsonFilesDiff;
// let yamlFilesDiff;
// let unsupportedConfig;

// beforeAll(() => {
const jsonFilePath2 = getFixturePath('config2.json');
const jsonFilePath1 = getFixturePath('config1.json');
const yamlFilePath1 = getFixturePath('config1.yml');
const yamlFilePath2 = getFixturePath('config2.yaml');
const emptyJSONFile = getFixturePath('emptyConfig.json');
const parsedConfig1 = JSON.parse(fs.readFileSync(jsonFilePath1, 'utf-8'));
const parsedConfig2 = JSON.parse(fs.readFileSync(jsonFilePath2, 'utf-8'));
const jsonFilesDiff = diff(jsonFilePath1, jsonFilePath2);
const yamlFilesDiff = diff(yamlFilePath1, yamlFilePath2);
const unsupportedConfig = getFixturePath('unsupportedConfig.txt');
// });

test('parse test', () => {
  expect(() => parse()).toThrow();
  expect(() => parse('')).toThrow('Can not read the file extention');
  expect(() => parse(emptyJSONFile)).toThrow('Unexpected end of JSON input');
  expect(() => parse(unsupportedConfig)).toThrow('Unsupported file extansion');
  expect(parse(jsonFilePath1)).toEqual(parsedConfig1);
  expect(parse(yamlFilePath2)).toEqual(parsedConfig2);
});

test('diff test', () => {
  expect(jsonFilesDiff).toEqual(diffResult);
  expect(yamlFilesDiff).toEqual(diffResult);
});

test('formatter stylish', () => {
  expect(formatter(jsonFilePath1, jsonFilePath2)).toEqual(stylishResult);
});
test('formatter plain', () => {
  expect(formatter(yamlFilePath1, jsonFilePath2, 'plain')).toEqual(plainResult);
});

test('formatter json', () => {
  expect(formatter(jsonFilePath1, jsonFilePath2, 'json')).toEqual(jsonResult);
});
