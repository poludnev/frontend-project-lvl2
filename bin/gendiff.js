#!/usr/bin/env node

import commander from 'commander';
import formatter from '../src/formatter.js';

// const { Command } = pkg;
const program = new commander.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-V --version', 'output usage information')
  .option('-f --format [type]', 'output format', 'stylish')
  .action((file1, file2, option) => {
    console.log(formatter(file1, file2, option.format));
  });

program.parse(process.argv);
