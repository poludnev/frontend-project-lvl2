import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const fileExtName = path.extname(file);
  if (!fileExtName) throw new Error('Can not read the file extention');
  const currentDirectoryPath = process.cwd();
  const filePath = path.resolve(currentDirectoryPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  if (fileExtName === '.json') return JSON.parse(fileContent);
  if (fileExtName === '.yaml') {
    const parseResult = yaml.load(fileContent);
    if (parseResult === null) throw new Error('Empty file');
    return parseResult;
  }
  return false;
};