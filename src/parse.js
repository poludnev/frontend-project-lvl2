import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

export const parseJSON = (file) => {
  if (!file) throw new Error('empty file path');
  const currentDirectoryPath = process.cwd();
  const filePath = path.resolve(currentDirectoryPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

export const parseYaml = (file) => {
  if (!file) throw new Error('empty file path');
  const currentDirectoryPath = process.cwd();
  const filePath = path.resolve(currentDirectoryPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parseResult = yaml.load(fileContent);
  if (!parseResult) throw new Error('Empty file');
  return parseResult;
};
export default (file) => {
  const fileExtName = path.extname(file);
  if (!fileExtName) throw new Error('Can not read the file extention');
  if (fileExtName === '.json') return parseJSON(file);
  if (fileExtName === '.yml') return parseYaml(file);
  return false;
};
