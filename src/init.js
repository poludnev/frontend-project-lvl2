import { Command } from 'commander';
import formatter from './formatter.js';
import diff from './diff.js';

const program = new Command();

export default (argv = process.argv) => {
  // console.log('test run0', argv);
  // console.log('test run1', process.argv);
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    // .arguments('<filepath2>')
    // .allowUnknownOption()
    .helpOption('-h, --help', 'read more information')
    .option('-V --version', 'output usage information')
    .option('-f --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
      // console.log('actoin', filepath1, filepath2);
      if (filepath1.length === 0) throw new Error('empty file path');
      if (filepath2.length === 0) throw new Error('empty file path');
      const result = formatter[options.format](diff(filepath1, filepath2));
      console.log(result);
    });
  program.parse(argv);
  // console.log('test run2', process.argv);
};
