import { Command, option } from 'commander';
import formatter from './formatter.js';
import diff from './diff.js';

const program = new Command();

export default (...args) => {
  console.log('test run0', args);
  // console.log('test run0', args.splice(-2));
  console.log('process', process.argv);
  console.log('test run2', [process.argv[0], process.argv[1], ...args]);
  // if (argv.length < 0)
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
      console.log('actoin', filepath1, filepath2, 'option', options, 'option end');
      const format = { format: options.format };
      if (filepath1.length === 0) throw new Error('empty file path');
      if (filepath2.length === 0) throw new Error('empty file path');
      if (!options.format) {
        format.format = option;
      }
      const result = formatter[options.format](diff(filepath1, filepath2));
      console.log(result);
      return result;
    });
  // const args = argv.length <= 0 ? process.argv : argv;
  // console.log(args);
  program.parse([process.argv[0], process.argv[1], ...args, process.argv[1]]);

  // program.parse([...args]);
  return program._actionResults[0];

  // console.log('test run2', process.argv);
};
