import * as fs from 'fs';
import * as path from 'path';

const buildAbsultePath = (relativePath) => {
  const currentDirectoryPath = process.cwd();
  return path.resolve(currentDirectoryPath, relativePath);
};

const readFile = (relativePath) => {
  const absolutePath = buildAbsultePath(relativePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};
export { buildAbsultePath, readFile };
