import _ from 'lodash';
import nodeTypes from './nodeTypes.js';

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

export default buildDifference;
