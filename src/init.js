import { program } from 'commander';
import _ from 'lodash';
// import parseFile from './parse.js';
import formatter from './formatter.js';
import diff from './diff.js';

export default (argv) => {
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .helpOption('-h, --help', 'read more information')
    .option('-V --version', 'output usage information')
    .option('-f --format [type]', 'output format', 'stylish')
    .action((file1 = '', file2 = '', options) => {
      if (file1.length === 0) throw new Error('empty file path');
      if (file2.length === 0) throw new Error('empty file path');
      const result = formatter[options.format](diff(file1, file2));
      console.log(result);
    });
  program.parse(argv);
};
