import * as path from 'path';
import buildDifferenceTree from './buildDiff.js';
import parse from './parser.js';
import { formate } from './formatters/formatters.js';
import { readFile } from './utils.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  if (!extension1) throw new Error('Can not read the filepath1 extention');
  if (!extension2) throw new Error('Can not read the filepath2 extention');

  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const data1 = parse(fileContent1, extension1);
  const data2 = parse(fileContent2, extension2);

  const differenceTree = buildDifferenceTree(data1, data2);
  return formate(differenceTree, formatName);
};
