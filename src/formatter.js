import statusTypes from './status.js';

const makeStringFromObject = (obj, depth = 1, filler = '  ') => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (value instanceof Object) {
      return `${filler.repeat(depth + 2)}${key}: ${makeStringFromObject(value, depth + 2)}`;
    }
    if (`${value}`.length === 0) return `${filler.repeat(depth + 1)}${key}: `;
    return `${filler.repeat(depth + 2)}${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${filler.repeat(depth)}}`;
};

const convert = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object' && value !== null) return '[complex value]';
  return value;
};

const makeString = (key, value, depth = 1) => {
  if (value instanceof Array) {
    return `${key}: [${value.join(', ')}]`;
  }
  if (value instanceof Object) {
    return `${key}: ${makeStringFromObject(value, depth + 1)}`;
  }
  if (`${value}`.length === 0) return `${key}: `;
  return `${key}: ${value}`;
};

const stylish = (diff, depth = 1, filler = '  ') => {
  const result = diff.map(({ key, status, value, previousValue, children }) => {
    switch (status) {
      case statusTypes.added:
        return `${filler.repeat(depth)}+ ${makeString(key, value, depth)}`;
      case statusTypes.removed:
        return `${filler.repeat(depth)}- ${makeString(key, value, depth)}`;
      case statusTypes.updated:
        return `${filler.repeat(depth)}- ${makeString(key, previousValue, depth)}\n${filler.repeat(
          depth
        )}+ ${makeString(key, value, depth)}`;
      case statusTypes.equal:
        if (children) {
          return `${filler.repeat(depth)}  ${key}: ${stylish(children, depth + 2)}`;
        }
        return `${filler.repeat(depth)}  ${makeString(key, value, depth)}`;
      default:
        return `${key}, ${status}`;
    }
  });

  return `{\n${result.join('\n')}\n${filler.repeat(depth - 1)}}`;
};

const plain = (diff, parentKey = '') => {
  const result = diff
    .filter(({ status, children }) => status !== statusTypes.equal || children)
    .map(({ key, status, value, previousValue, children }) => {
      if (status === statusTypes.removed) {
        return `Property '${parentKey}${key}' was ${status}`;
      }
      if (status === statusTypes.updated) {
        return `Property '${parentKey}${key}' was ${status}. From ${convert(
          previousValue
        )} to ${convert(value)}`;
      }
      if (status === statusTypes.equal) {
        return plain(children, `${parentKey}${key}.`);
      }
      return `Property '${parentKey}${key}' was ${status} with value: ${convert(value)}`;
    });
  return result.join('\n');
};
const json = (diff) => JSON.stringify(diff, null, 2);

export default {
  stylish,
  plain,
  json,
};
