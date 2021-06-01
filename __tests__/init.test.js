import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import { expect, test } from '@jest/globals';
import parse from '../src/parser';
import formatter from '../src/genDiff.js';
import diff from '../src/buildDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const stylishResult = fs.readFileSync(getFixturePath('results/stylish.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('results/plain.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('results/json.txt'), 'utf-8');
const diffResult = JSON.parse(fs.readFileSync(getFixturePath('results/diffResult.txt'), 'utf-8'));

const jsonFilePath2 = getFixturePath('config2.json');
const jsonFilePath1 = getFixturePath('config1.json');
const yamlFilePath1 = getFixturePath('config1.yml');
const yamlFilePath2 = getFixturePath('config2.yaml');
const emptyJSONFile = getFixturePath('emptyConfig.json');
const jsonFileData1 = fs.readFileSync(jsonFilePath1, 'utf-8');
const jsonFileData2 = fs.readFileSync(jsonFilePath2, 'utf-8');
const yamlFileData2 = fs.readFileSync(yamlFilePath2, 'utf-8');
const yamlFileData1 = fs.readFileSync(yamlFilePath1, 'utf-8');
const parsedConfig1 = JSON.parse(fs.readFileSync(jsonFilePath1, 'utf-8'));
const parsedConfig2 = JSON.parse(fs.readFileSync(jsonFilePath2, 'utf-8'));
const data1 = parse(jsonFileData1, 'json');
const data2 = parse(jsonFileData2, 'json');
const data3 = parse(yamlFileData1, 'yaml');
const data4 = parse(yamlFileData2, 'yaml');

const jsonFilesDiff = diff(data1, data2);
const yamlFilesDiff = diff(data3, data4);
const unsupportedConfig = fs.readFileSync(getFixturePath('unsupportedConfig.txt'), 'utf-8');

test('parse test', () => {
  expect(() => parse()).toThrow();
  expect(() => parse('')).toThrow();
  expect(() => parse(emptyJSONFile, 'json')).toThrow();
  expect(() => parse(unsupportedConfig, '.txt')).toThrow();

  expect(parse(jsonFileData1, 'json')).toEqual(parsedConfig1);
  expect(parse(yamlFileData2, 'yaml')).toEqual(parsedConfig2);
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
