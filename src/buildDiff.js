import _ from 'lodash';

export const nodeTypes = {
  equal: 'equal',
  updated: 'updated',
  removed: 'removed',
  added: 'added',
  nested: 'nested',
};

const buildDifference = (data1, data2) => {
  const fileKeys1 = Object.keys(data1);
  const fileKeys2 = Object.keys(data2);
  const commonKeys = _.sortBy(_.union(fileKeys1, fileKeys2));
  const difference = commonKeys.map((key) => {
    switch (true) {
      case !_.has(data2, key):
        return { key, status: nodeTypes.removed, value1: data1[key] };
      case !_.has(data1, key):
        return { key, status: nodeTypes.added, value1: data2[key] };
      case _.isPlainObject(data1[key]) && _.isPlainObject(data2[key]):
        return {
          key,
          status: nodeTypes.nested,
          value1: null,
          children: buildDifference(data1[key],
            data2[key]),
        };
      case _.isEqual(data1[key], data2[key]):
        return { key, status: nodeTypes.equal, value1: data1[key] };
      case data1[key] !== data2[key]:
        return {
          key, status: nodeTypes.updated, value1: data2[key], value2: data1[key],
        };
      default:
        throw new Error('Unable get difference');
    }
  });
  return difference;
};

export default buildDifference;
