import * as path from 'path';
import diff from './buildDiff.js';
import parse from './parser.js';
import formatters from './formatters/formatters.js';
import readFile from './fileReader.js';

export default (file1, file2, formatName = 'stylish') => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);

  if (!extension1) throw new Error('Can not read the filepath1 extention');
  if (!extension2) throw new Error('Can not read the filepath2 extention');

  const fileContent1 = readFile(file1);
  const fileContent2 = readFile(file2);

  const data1 = parse(fileContent1, extension1);
  const data2 = parse(fileContent2, extension2);

  const difference = diff(data1, data2);
  return formatters[formatName](difference);
};
