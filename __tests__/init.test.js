import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import { beforeAll, expect, jest, test } from '@jest/globals';
import init from '..';
import parse from '../src/parse.js';
import comparingResults from '../__fixtures__/comparingResults.js';
import formatter from '../src/formatter';
import diff from '../src/diff.js';
import cons from '../src/cons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonFilePath1;
let jsonFilePath2;
let yamlFilePath1;
let yamlFilePath2;
let emptyJSONFile;
let parsedConfig1;
let parsedConfig2;
let jsonFilesDiff;
let yamlFilesDiff;

beforeAll(() => {
  jsonFilePath1 = getFixturePath('config1.json');
  jsonFilePath2 = getFixturePath('config2.json');
  yamlFilePath1 = getFixturePath('config1.yaml');
  yamlFilePath2 = getFixturePath('config2.yaml');
  emptyJSONFile = getFixturePath('emptyConfig.json');
  parsedConfig1 = JSON.parse(fs.readFileSync(jsonFilePath1, 'utf-8'));
  parsedConfig2 = JSON.parse(fs.readFileSync(jsonFilePath2, 'utf-8'));
  jsonFilesDiff = diff(jsonFilePath1, jsonFilePath2);
  yamlFilesDiff = diff(yamlFilePath1, yamlFilePath2);
});

test('parse test', () => {
  expect(() => parse()).toThrow();
  expect(() => parse('')).toThrow('Can not read the file extention');
  expect(() => parse(emptyJSONFile)).toThrow('Unexpected end of JSON input');
  expect(() => parse(getFixturePath('config1.txt'))).toThrow('Unsupported file extansion');
  expect(parse(jsonFilePath1)).toEqual(parsedConfig1);
  expect(parse(yamlFilePath2)).toEqual(parsedConfig2);
});

test('diff test', () => {
  expect(jsonFilesDiff).toEqual(comparingResults.diff);
  expect(yamlFilesDiff).toEqual(comparingResults.diff);
});

test('formatter stylish', () => {
  expect(formatter.stylish(jsonFilesDiff)).toEqual(comparingResults.stylish);
});
test('formatter plain', () => {
  expect(formatter.plain(jsonFilesDiff)).toEqual(comparingResults.plain);
});

test('formatter json', () => {
  expect(formatter.json(jsonFilesDiff)).toEqual(comparingResults.json);
});

test('init', () => {
  console.log = jest.fn();

  // init(['/usr/local/bin/node', '/usr/local/bin/gendiff', yamlFilePath1, yamlFilePath2]);
  init(['/usr/local/bin/node', '/usr/local/bin/gendiff', yamlFilePath1, yamlFilePath2]);
  expect(console.log).toHaveBeenCalledWith(comparingResults.stylish);
});
