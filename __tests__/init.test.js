import path from 'path';
import { fileURLToPath } from 'url';

import { beforeAll, expect, jest, test } from '@jest/globals';
// import { render } from '..';
import init from '..';
// import parse, { parseJSON, parseYaml } from '../src/parse.js';
import parse from '../src/parse.js';
import comparingResults from '../__fixtures__/comparingResults.js';
// import parsedConfigFilesContent from '../__fixtures__/parsedConfigFilesContent.js';
// import diff from '../src/diff.js';
import formatter from '../src/formatter';
// import plain from '../src/plain.js';
// import json from '../src/json.js';
// import convertDiff from '../src/converDiff.js';
import objDiff from '../src/objectDiff.js';
// import { exec } from 'child_process';
// import { compareArrays } from '../src/utils.js';
// import formate from '../src/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname);
// console.log(import.meta.url);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonFile1;
let jsonFile2;
let yamlFile1;
let yamlFile2;
let emptyJSONFile;
let emptyYamlFile;
let file1;
let file2;

beforeAll(() => {
  jsonFile1 = getFixturePath('config1.json');
  jsonFile2 = getFixturePath('config2.json');
  yamlFile1 = getFixturePath('config1.yaml');
  yamlFile2 = getFixturePath('config2.yaml');
  emptyJSONFile = getFixturePath('emptyConfig.json');
  emptyYamlFile = getFixturePath('emptyConfig.yaml');
  file1 = parse(getFixturePath('flatConfig1.json'));
  file2 = parse(getFixturePath('flatConfig2.json'));
});

test('parse test', () => {
  expect(() => parse()).toThrow();
  expect(() => parse('')).toThrow('Can not read the file extention');
  expect(() => parse(emptyYamlFile)).toThrow('Empty file');
  expect(parse(getFixturePath('config1.txt'))).toBe(false);
  expect(parse(getFixturePath('flatConfig1.json'))).toEqual({
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { doge: { wow: '' }, key: 'value' },
    stettings10: [true, false],
    stettings7: [],
    stettings8: [true, false],
    stettings9: [true, false],
  });
  expect(parse(getFixturePath('config1.yaml'))).toEqual({
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { doge: { wow: '' }, key: 'value' },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345, deep: { id: 45 } },
  });
});

test('obj diff test', () => {
  expect(objDiff(file1, file2)).toEqual(comparingResults.result5);
  expect(objDiff(parse(jsonFile1), parse(jsonFile2))).toEqual(comparingResults.result4);
  expect(objDiff(parse(yamlFile1), parse(yamlFile2))).toEqual(comparingResults.result4);
});

// test('compareAttays tests', () => {
//   expect(() => compareArrays('text', true)).toThrow();
//   expect(compareArrays([], [])).toBe(true);
//   expect(compareArrays([1, 2], [2, 1])).toBe(false);
//   expect(compareArrays([1, 2, 3], [1, 2, 3])).toBe(true);
//   expect(compareArrays([1, 2, 3], [1, 2])).toBe(false);
// });

test('formatter stylish', () => {
  expect(formatter.stylish(objDiff(parse(jsonFile1), parse(jsonFile2)))).toEqual(
    comparingResults.result1
  );
});
test('formatter plain', () => {
  expect(formatter.plain(objDiff(parse(jsonFile1), parse(jsonFile2)))).toEqual(
    comparingResults.result3
  );
});

test('formatter json', () => {
  expect(formatter.json(objDiff(file1, file2))).toEqual(comparingResults.result6);
});

// test('render', () => {
//   // expect(() => render()).toThrow('empty file path');
//   console.log = jest.fn();
//   expect(render(jsonFile1, jsonFile2)).toBe(true);
//   expect(console.log).toHaveBeenCalledWith(comparingResults.result1);
// });

test('init', () => {
  console.log = jest.fn();
  init([
    '/usr/local/bin/node',
    '/usr/local/bin/gendiff',
    '__fixtures__/config1.json',
    '__fixtures__/config2.json',
  ]);

  expect(console.log).toHaveBeenCalledWith(comparingResults.result1);
});
