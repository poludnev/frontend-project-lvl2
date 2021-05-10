import _ from 'lodash';
import statusTypes from './status.js';
// import { compareArrays as isArraysEqual } from './utils.js';

// const status = {
//   equal: 'equal',
//   updated: 'updated',
//   removed: 'removed',
//   added: 'added',
// };

const makeNode = (key, status, value, previousValue = undefined, children = undefined) =>
  _.pickBy(
    {
      key,
      status,
      value,
      previousValue,
      children,
    },
    (e) => e !== undefined
  );
const objDiff = (parsedFile1, parsedFile2) => {
  const fileKeys1 = Object.keys(parsedFile1);
  const fileKeys2 = Object.keys(parsedFile2);
  const commonKeys = _.union(fileKeys1, fileKeys2).sort();
  const difference = commonKeys.map((key) => {
    switch (true) {
      case !_.has(parsedFile2, key):
        return makeNode(key, statusTypes.removed, parsedFile1[key]);
      case !_.has(parsedFile1, key):
        return makeNode(key, statusTypes.added, parsedFile2[key]);
      case parsedFile1[key] === parsedFile2[key]:
        return makeNode(key, statusTypes.equal, parsedFile1[key]);
      case parsedFile1[key] instanceof Array &&
        parsedFile2[key] instanceof Array &&
        _.isEqual(parsedFile1[key], parsedFile2[key]):
        // isArraysEqual(parsedFile1[key], parsedFile2[key]):
        return makeNode(key, statusTypes.equal, parsedFile1[key]);
      case parsedFile1[key] instanceof Array || parsedFile2[key] instanceof Array:
        return makeNode(key, statusTypes.updated, parsedFile2[key], parsedFile1[key]);
      case parsedFile1[key] instanceof Object && parsedFile2[key] instanceof Object:
        return makeNode(
          key,
          statusTypes.equal,
          null,
          undefined,
          objDiff(parsedFile1[key], parsedFile2[key])
        );
      default:
        return makeNode(key, statusTypes.updated, parsedFile2[key], parsedFile1[key]);
    }
  });

  return difference;
};

export default objDiff;
