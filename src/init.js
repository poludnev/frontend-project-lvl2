import { program } from 'commander';

const firstRun = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .helpOption('-h, --help', 'read more information')
    .option('-V --version', 'output usage information')
    .option('-f --format [type]', 'output format');
  program.parse(process.argv);
};

export default firstRun;
