import { program } from 'commander';
import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const makeKeyStatusPairs = (key, data1, data2) => {
  if (!key || !data1 || !data2) throw new Error('empty key or data');
  if (Object.keys(data1).length < 1) throw new Error('empty object');
  if (Object.keys(data2).length < 1) throw new Error('empty object');
  let status = 'equal';

  if (!data2[key]) {
    status = 'deleted';
  } else if (!data1[key]) {
    status = 'added';
  } else if (data2[key] !== data1[key]) {
    status = 'changed';
  }
  return [key, status];
};

const parseFile = (file) => {
  if (!file) throw new Error('empty file path');
  const currentDirectoryPath = process.cwd();
  const filePath = path.resolve(currentDirectoryPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

const render = (file1 = '', file2 = '') => {
  if (file1.length === 0) throw new Error('empty file path');
  if (file2.length === 0) throw new Error('empty file path');

  const parsedFile1 = parseFile(file1);
  const parsedFile2 = parseFile(file2);

  const file1Keys = Object.keys(parsedFile1);
  const file2Keys = Object.keys(parsedFile2);
  const commonKeys = _.union(file1Keys, file2Keys).sort();

  const result = commonKeys
    .map((key) => makeKeyStatusPairs(key, parsedFile1, parsedFile2))
    .map(([key, status]) => {
      if (status === 'deleted') return `  - ${key}: ${parsedFile1[key]}`;
      if (status === 'changed') return `  - ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}`;
      if (status === 'added') return `  + ${key}: ${parsedFile2[key]}`;
      return `    ${key}: ${parsedFile1[key]}`;
    })
    .join('\n');
  console.log(`{\n${result}\n}`);
  return true;
};

export default () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .helpOption('-h, --help', 'read more information')
    .option('-V --version', 'output usage information')
    .option('-f --format [type]', 'output format')
    .action(render);
  program.parse(process.argv);
};

export { render, makeKeyStatusPairs, parseFile };
