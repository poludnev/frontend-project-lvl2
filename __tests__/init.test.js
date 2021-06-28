import { expect, test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => `__fixtures__/${filename}`;

const jsonFilePath1 = getFixturePath('config1.json');
const jsonFilePath2 = getFixturePath('config2.json');
const yamlFilePath1 = getFixturePath('config1.yml');
const yamlFilePath2 = getFixturePath('config2.yaml');
const unsupportedFilePath = getFixturePath('unsupportedConfig.txt');

test.each`
  args | error | case
  ${[jsonFilePath1, '']} | ${'EISDIR'} | ${'wrong filepath2'}
  ${['', '']} | ${'EISDIR'} | ${'wrong filepath1 and filepath2'}
  ${[jsonFilePath1, jsonFilePath2, 'txt']} | ${'Unsupported output format'} | ${'wrong format'}
  ${[jsonFilePath1, unsupportedFilePath]} | ${'Unsupported data type'} | ${'wrong extension'}
`('Edge-case: $case', ({ args, error }) => {
  expect(() => genDiff(...args)).toThrow(error);
});

test.each`
  args | styleName
  ${[jsonFilePath1, jsonFilePath2]} | ${'stylish'}
  ${[yamlFilePath1, yamlFilePath2, 'plain']} | ${'plain'}
  ${[yamlFilePath1, jsonFilePath2, 'json']} | ${'json'}
`('When foramt is $styleName', ({ args, styleName }) => {
  const resultsPath = getFixturePath(`results/${styleName}.txt`);
  const expected = readFile(resultsPath);
  expect(genDiff(...args)).toEqual(expected);
});
