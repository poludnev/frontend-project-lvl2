import * as fs from 'fs';
import * as path from 'path';
import diff from './buildDiff.js';
import parse from './parser.js';
import dataTypes from './dataTypes.js';
import formatters from './formatters/formatters';

const getDataType = (fileExtension, dataTypesList) => {
  if (!dataTypesList[fileExtension]) throw new Error('Unknown file extension');
  return dataTypesList[fileExtension];
};

export default (file1, file2, option = 'stylish') => {
  const currentDirectoryPath = process.cwd();

  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);

  if (!extension1) throw new Error('Can not read the filepath1 extention');
  if (!extension2) throw new Error('Can not read the filepath2 extention');

  const filePath1 = path.resolve(currentDirectoryPath, file1);
  const filePath2 = path.resolve(currentDirectoryPath, file2);

  const fileContent1 = fs.readFileSync(filePath1, 'utf-8');
  const fileContent2 = fs.readFileSync(filePath2, 'utf-8');

  const dataType1 = getDataType(extension1, dataTypes);
  const dataType2 = getDataType(extension2, dataTypes);

  const data1 = parse(fileContent1, dataType1);
  const data2 = parse(fileContent2, dataType2);

  const difference = diff(data1, data2);
  return formatters[option](difference);
};
