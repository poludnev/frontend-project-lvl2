import _ from 'lodash';
import nodeTypes from './nodeTypes.js';
import parseConfigFile from './parser.js';

export const makeNode = (
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

const getConfigFilesDifference = (parsedFile1, parsedFile2) => {
  const fileKeys1 = Object.keys(parsedFile1);
  const fileKeys2 = Object.keys(parsedFile2);
  const commonKeys = _.sortBy(_.union(fileKeys1, fileKeys2));
  const difference = commonKeys.map((key) => {
    switch (true) {
      case !_.has(parsedFile2, key):
        return makeNode(key, nodeTypes.removed, parsedFile1[key]);
      case !_.has(parsedFile1, key):
        return makeNode(key, nodeTypes.added, parsedFile2[key]);
      case parsedFile1[key] === parsedFile2[key]:
        return makeNode(key, nodeTypes.equal, parsedFile1[key]);
      case parsedFile1[key] instanceof Array
        && parsedFile2[key] instanceof Array
        && _.isEqual(parsedFile1[key], parsedFile2[key]):
        return makeNode(key, nodeTypes.equal, parsedFile1[key]);
      case parsedFile1[key] instanceof Array || parsedFile2[key] instanceof Array:
        return makeNode(key, nodeTypes.updated, parsedFile2[key], parsedFile1[key]);
      case parsedFile1[key] instanceof Object && parsedFile2[key] instanceof Object:
        return makeNode(
          key,
          nodeTypes.nested,
          null,
          undefined,
          getConfigFilesDifference(parsedFile1[key], parsedFile2[key]),
        );
      case parsedFile1[key] !== parsedFile2[key]:
        return makeNode(key, nodeTypes.updated, parsedFile2[key], parsedFile1[key]);
      default:
        throw new Error('Unable get difference');
    }
  });

  return difference;
};

export default (configFilePath1, configFilePath2) => {
  const parsedConfig1 = parseConfigFile(configFilePath1);
  const parsedConfig2 = parseConfigFile(configFilePath2);

  return getConfigFilesDifference(parsedConfig1, parsedConfig2);
};
