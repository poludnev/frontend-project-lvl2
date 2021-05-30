import nodeTypes from '../nodeTypes.js';

const convertValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object' && value !== null) return '[complex value]';
  return value;
};

const plain = (filesDifference, parentKey = '') => {
  const result = filesDifference
    .filter(({ status, children }) => status !== nodeTypes.equal || children)
    .map(({
      key, status, value, previousValue, children,
    }) => {
      switch (status) {
        case nodeTypes.removed:
          return `Property '${parentKey}${key}' was ${status}`;
        case nodeTypes.updated:
          return `Property '${parentKey}${key}' was ${status}. From ${convertValue(
            previousValue,
          )} to ${convertValue(value)}`;
        case nodeTypes.nested:
          return plain(children, `${parentKey}${key}.`);
        case nodeTypes.added:
          return `Property '${parentKey}${key}' was ${status} with value: ${convertValue(value)}`;
        default:
          throw new Error('Unknown node type');
      }
    });
  return result.join('\n');
};

export default plain;
