import * as fs from 'fs';
import * as path from 'path';

export default (relativePagh) => {
  const currentDirectoryPath = process.cwd();
  const absolutePath = path.resolve(currentDirectoryPath, relativePagh);
  return fs.readFileSync(absolutePath, 'utf-8');
};
