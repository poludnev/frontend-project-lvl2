import { program } from 'commander';
import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const render = (file1 = '', file2 = '') => {
  if (file1.length < 1 || file2.length < 1) return 'empty file path';
  const f1 = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf-8');
  const f2 = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf-8');

  const parsedF1 = JSON.parse(f1);
  const parsedF2 = JSON.parse(f2);
  const f1Keys = Object.keys(parsedF1);
  const f2Keys = Object.keys(parsedF2);
  const keys = _.union(f1Keys, f2Keys).sort();

  const fn = (val) => {
    let status = 'equal';

    if (!parsedF2[val]) {
      status = 'deleted';
    } else if (!parsedF1[val]) {
      status = 'added';
    } else if (parsedF2[val] !== parsedF1[val]) {
      status = 'changed';
    }
    return [val, status];
  };
  const result = keys
    .map(fn)
    .reduce((acc, val) => {
      if (val[1] === 'deleted') {
        acc.push(`  - ${val[0]}: ${parsedF1[val[0]]}`);
      }
      if (val[1] === 'equal') {
        acc.push(`    ${val[0]}: ${parsedF1[val[0]]}`);
      }
      if (val[1] === 'changed') {
        acc.push(`  - ${val[0]}: ${parsedF1[val[0]]}`, `  + ${val[0]}: ${parsedF2[val[0]]}`);
      }
      if (val[1] === 'added') {
        acc.push(`  + ${val[0]}: ${parsedF2[val[0]]}`);
      }
      return acc;
    }, [])
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
  // console.log(process.cwd());
  // console.log(path.resolve());
};

export { render };
export default firstRun;
