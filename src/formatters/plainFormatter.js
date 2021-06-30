import { nodeTypes } from '../buildDiff.js';

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (value === null) return `${value}`;
  if (typeof value === 'object') return '[complex value]';
  return `${value}`;
};

const plain = (filesDifference, parentKey = '') => {
  const result = filesDifference
    .filter(({ status }) => status !== nodeTypes.equal)
    .map(({
      key, status, value1, value2, children,
    }) => {
      switch (status) {
        case nodeTypes.removed:
          return `Property '${parentKey}${key}' was ${status}`;
        case nodeTypes.updated:
          return `Property '${parentKey}${key}' was ${status}. From ${stringify(
            value2,
          )} to ${stringify(value1)}`;
        case nodeTypes.nested:
          return plain(children, `${parentKey}${key}.`);
        case nodeTypes.added:
          return `Property '${parentKey}${key}' was ${status} with value: ${stringify(value1)}`;
        default:
          throw new Error(`Unknown node type: ${status}`);
      }
    });
  return result.join('\n');
};

export default plain;
