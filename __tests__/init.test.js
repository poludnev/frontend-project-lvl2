import { expect, jest, test } from '@jest/globals';
import { render, makeKeyStatusPairs } from '../src/init.js';
import parseFile, { parseJSON, parseYaml } from '../src/parse.js';
import jsonFilesContent from '../__fixtures__/jsonFilesContent.js';

const wrongFile = 'wrongfilename';
const file1 = '__fixtures__/p1.json';
const file2 = '__fixtures__/p2.json';
const yamlFile1 = '__fixtures__/p1.yml';
const emptyFile = '__fixtures__/emptyFile.json';
const emptyYamlFile = '__fixtures__/emptyFile.yml';

test('parseJSON', () => {
  expect(() => parseJSON()).toThrow('empty file path');
  expect(() => parseJSON(wrongFile)).toThrow('ENOENT');
  expect(() => parseJSON(emptyFile)).toThrow('Unexpected end of JSON input');
  expect(parseJSON(file1)).toMatchObject(jsonFilesContent.file1Content);
});

test('yaml parser', () => {
  expect(() => parseYaml()).toThrow('empty file path');
  expect(() => parseYaml(wrongFile)).toThrow('ENOENT');
  expect(() => parseYaml(emptyYamlFile)).toThrow('Empty file');
  expect(parseYaml(yamlFile1)).toMatchObject(jsonFilesContent.file1Content);
});

test('parse', () => {
  expect(() => parseFile()).toThrow();
  expect(() => parseFile('somestr')).toThrow('Can not read the file extention');
  expect(parseFile(file1)).toMatchObject(jsonFilesContent.file1Content);
  expect(parseFile(yamlFile1)).toMatchObject(jsonFilesContent.file1Content);
});

const data1 = parseJSON(file1);
const data2 = parseJSON(file2);
const keys = Object.keys(data1).sort();

test('makeKeyStatusPairs', () => {
  expect(makeKeyStatusPairs(keys[0], data1, data2)).toEqual(['follow', 'deleted']);
  expect(makeKeyStatusPairs(keys[1], data1, data2)).toEqual(['host', 'equal']);
  expect(() => makeKeyStatusPairs()).toThrow('empty key or data');
  expect(() => makeKeyStatusPairs(keys[0], {}, {})).toThrow('empty object');
});

test('render', () => {
  expect(() => render()).toThrow('empty file path');
  console.log = jest.fn();
  expect(render(file1, file2)).toBe(true);
  expect(console.log).toHaveBeenCalledWith(jsonFilesContent.compareResult);
});
