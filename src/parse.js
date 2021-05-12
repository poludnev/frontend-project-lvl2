import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  // console.log('file', typeof file, file);
  const fileExtName = path.extname(file);
  if (!fileExtName) throw new Error('Can not read the file extention');
  const currentDirectoryPath = process.cwd();
  const filePath = path.resolve(currentDirectoryPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  switch (fileExtName) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
      return yaml.load(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    default:
      throw new Error('Unsupported file extansion');
  }
};
