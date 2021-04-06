import { program } from 'commander';

const firstRun = () => {
  program.description(
    'Compares two configuration files and shows a difference.'
  );
  program.helpOption('-h, --help', 'read more information');
  program.option('-V --version', 'output usage information');
  program.parse(process.argv);
};
export default firstRun;
