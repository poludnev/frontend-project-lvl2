import * as fs from 'fs';
import * as path from 'path';

const dataTypes = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
};

const buildAbsultePath = (relativePath) => {
  const currentDirectoryPath = process.cwd();
  return path.resolve(currentDirectoryPath, relativePath);
};

const readFile = (relativePath) => {
  const absolutePath = buildAbsultePath(relativePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getDataType = (fileExtension) => {
  if (!dataTypes[fileExtension]) throw new Error('Unknown file extension');
  return dataTypes[fileExtension];
};

export { buildAbsultePath, readFile, getDataType };
