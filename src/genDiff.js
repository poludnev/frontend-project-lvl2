import * as path from 'path';
import buildDifferenceTree from './buildDiff.js';
import parse from './parser.js';
import format from './formatters/formatters.js';
import { readFile, extractFormat } from './utils.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const dataFormat1 = extractFormat(extension1);
  const dataFormat2 = extractFormat(extension2);

  const data1 = parse(fileContent1, dataFormat1);
  const data2 = parse(fileContent2, dataFormat2);

  const differenceTree = buildDifferenceTree(data1, data2);
  return format(differenceTree, formatName);
};
