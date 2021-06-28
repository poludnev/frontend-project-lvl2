import * as fs from 'fs';
import * as path from 'path';

const buildFullPath = (relativePath) => path.resolve(process.cwd(), relativePath);

const readFile = (relativePath) => {
  const absolutePath = buildFullPath(relativePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const extractFormat = (fileExtension) => fileExtension.slice(1);

export { buildFullPath, readFile, extractFormat };
