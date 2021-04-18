// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import init from '../src/init.js';
import { expect } from '@jest/globals';
import { render, makeKeyStatusPairs, parseFile } from '../src/init.js';
import jsonFilesContent from '../__fixtures__/jsonFilesContent.js';
// import sum from '../sum.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const wrongFile = 'wrongfilename';
const file1 = '__fixtures__/p1.json';
const file2 = '__fixtures__/p2.json';
const emptyFile = '__fixtures__/emptyFile.json';

test('parseFile', () => {
  expect(() => parseFile()).toThrow('empty file path');
  expect(() => parseFile(wrongFile)).toThrow('ENOENT');
  expect(() => parseFile(emptyFile)).toThrow('Unexpected end of JSON input');
  expect(parseFile(file1)).toMatchObject(jsonFilesContent.file1Content);
});

const data1 = parseFile(file1);
const data2 = parseFile(file2);
const keys = Object.keys(data1).sort();

test('makeKeyStatusPairs', () => {
  expect(makeKeyStatusPairs(keys[0], data1, data2)).toEqual(['follow', 'deleted']);
  expect(makeKeyStatusPairs(keys[1], data1, data2)).toEqual(['host', 'equal']);
  expect(() => makeKeyStatusPairs()).toThrow('empty key or data');
  expect(() => makeKeyStatusPairs(keys[0], {}, {})).toThrow('empty object');
});

test('render', () => {
  expect(render()).toBe('empty file path');
});
