import { program } from 'commander';
import _ from 'lodash';
import parseFile from './parse.js';
import formatter from './formatter.js';
import diff from './objectDiff.js';

// const render = (file1 = '', file2 = '', options) => {
//   if (file1.length === 0) throw new Error('empty file path');
//   if (file2.length === 0) throw new Error('empty file path');
//   console.log('arguments', options.format);
//   const parsedFile1 = parseFile(file1);
//   const parsedFile2 = parseFile(file2);
//   const result = formatter.stylish(diff(parsedFile1, parsedFile2));
//   console.log(result);
//   return true;
// };

export default (argv) => {
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .helpOption('-h, --help', 'read more information')
    .option('-V --version', 'output usage information')
    .option('-f --format [type]', 'output format', 'stylish')
    // .action(render);
    .action((file1 = '', file2 = '', options) => {
      if (file1.length === 0) throw new Error('empty file path');
      if (file2.length === 0) throw new Error('empty file path');
      const parsedFile1 = parseFile(file1);
      const parsedFile2 = parseFile(file2);
      const result = formatter[options.format](diff(parsedFile1, parsedFile2));
      console.log(result);
      // return true;
    });

  program.parse(argv);
};

// export { render };
