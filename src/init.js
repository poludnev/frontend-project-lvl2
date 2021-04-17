import { program } from 'commander';
import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const makeKeyStatusPairs = (key, data1 = {}, data2 = {}) => {
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

const render = (file1Name = '', file2Name = '') => {
  const currentDirectoryPath = process.cwd();
  const filePath1 = path.resolve(currentDirectoryPath, file1Name);
  const filePath2 = path.resolve(currentDirectoryPath, file2Name);

  const file1Content = fs.readFileSync(filePath1, 'utf-8');
  const file2Content = fs.readFileSync(filePath2, 'utf-8');

  const parsedFile1 = JSON.parse(file1Content);
  const parsedFile2 = JSON.parse(file2Content);
  const file1Keys = Object.keys(JSON.parse(file1Content));
  const file2Keys = Object.keys(JSON.parse(file2Content));
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
};

const firstRun = () => {
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

export { render };
export default firstRun;
