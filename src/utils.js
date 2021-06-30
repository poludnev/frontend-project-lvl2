import * as fs from 'fs';
import * as path from 'path';

const buildFullPath = (relativePath) => path.resolve(process.cwd(), relativePath.trim());

const readFile = (relativePath) => fs.readFileSync(buildFullPath(relativePath), 'utf-8');

const extractFormat = (filename) => path.extname(filename.trim()).slice(1);

export { buildFullPath, readFile, extractFormat };
