import buildDifferenceTree from './buildDiff.js';
import parse from './parser.js';
import format from './formatters/formatters.js';
import { readFile, extractFormat } from './utils.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const dataFormat1 = extractFormat(filepath1);
  const dataFormat2 = extractFormat(filepath2);

  const data1 = parse(fileContent1, dataFormat1);
  const data2 = parse(fileContent2, dataFormat2);

  const differenceTree = buildDifferenceTree(data1, data2);
  return format(differenceTree, formatName);
};
