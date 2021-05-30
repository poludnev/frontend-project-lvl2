import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import nodeTypes from './nodeTypes.js';
import parse from './parser.js';
import dataTypes from './dataTypes.js';

const makeNode = (
  key,
  status,
  value,
  previousValue = undefined,
  children = undefined,
) => _.pickBy(
  {
    key,
    status,
    value,
    previousValue,
    children,
  },
  (e) => e !== undefined,
);

const buildDifference = (data1, data2) => {
  const fileKeys1 = Object.keys(data1);
  const fileKeys2 = Object.keys(data2);
  const commonKeys = _.sortBy(_.union(fileKeys1, fileKeys2));
  const difference = commonKeys.map((key) => {
    switch (true) {
      case !_.has(data2, key):
        return makeNode(key, nodeTypes.removed, data1[key]);
      case !_.has(data1, key):
        return makeNode(key, nodeTypes.added, data2[key]);
      case data1[key] === data2[key]:
        return makeNode(key, nodeTypes.equal, data1[key]);
      case data1[key] instanceof Array
        && data2[key] instanceof Array
        && _.isEqual(data1[key], data2[key]):
        return makeNode(key, nodeTypes.equal, data1[key]);
      case data1[key] instanceof Array || data2[key] instanceof Array:
        return makeNode(key, nodeTypes.updated, data2[key], data1[key]);
      case data1[key] instanceof Object && data2[key] instanceof Object:
        return makeNode(
          key,
          nodeTypes.nested,
          null,
          undefined,
          buildDifference(data1[key], data2[key]),
        );
      case data1[key] !== data2[key]:
        return makeNode(key, nodeTypes.updated, data2[key], data1[key]);
      default:
        throw new Error('Unable get difference');
    }
  });

  return difference;
};

const getDataType = (fileExtension, dataTypesList) => {
  if (!dataTypesList[fileExtension]) throw new Error('Unknown file extension');
  return dataTypesList[fileExtension];
};

export default (file1, file2) => {
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

  return buildDifference(data1, data2);
};
