#!/usr/bin/env node

import commander from 'commander';
import formatter from '../src/genDiff';

const program = new commander.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2, option) => {
    console.log(formatter(file1, file2, option.format));
  });

program.parse(process.argv);
