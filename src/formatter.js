import statusTypes from './status.js';
import diff from './diff.js';

const stringifyObject = (obj, depth = 1, filler = '  ') => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (value instanceof Object) {
      return `${filler.repeat(depth + 2)}${key}: ${stringifyObject(value, depth + 2)}`;
    }
    if (`${value}`.length === 0) return `${filler.repeat(depth + 1)}${key}: `;
    return `${filler.repeat(depth + 2)}${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${filler.repeat(depth)}}`;
};

const stringifyKeyValue = (key, value, depth = 1) => {
  if (value instanceof Array) {
    return `${key}: [${value.join(', ')}]`;
  }
  if (value instanceof Object) {
    return `${key}: ${stringifyObject(value, depth + 1)}`;
  }
  return `${key}: ${value}`;
};

const stylish = (filesDifference, depth = 1, filler = '  ') => {
  const result = filesDifference.map(({
    key, status, value, previousValue, children,
  }) => {
    switch (status) {
      case statusTypes.added:
        return `${filler.repeat(depth)}+ ${stringifyKeyValue(key, value, depth)}`;
      case statusTypes.removed:
        return `${filler.repeat(depth)}- ${stringifyKeyValue(key, value, depth)}`;
      case statusTypes.updated:
        return `${filler.repeat(depth)}- ${stringifyKeyValue(key, previousValue, depth)}\n${filler.repeat(
          depth,
        )}+ ${stringifyKeyValue(key, value, depth)}`;
      case statusTypes.equal:
        if (children) {
          return `${filler.repeat(depth)}  ${key}: ${stylish(children, depth + 2)}`;
        }
        return `${filler.repeat(depth)}  ${stringifyKeyValue(key, value, depth)}`;
      default:
        return `${key}, ${status}`;
    }
  });

  return `{\n${result.join('\n')}\n${filler.repeat(depth - 1)}}`;
};

const convertValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object' && value !== null) return '[complex value]';
  return value;
};

const plain = (filesDifference, parentKey = '') => {
  const result = filesDifference
    .filter(({ status, children }) => status !== statusTypes.equal || children)
    .map(({
      key, status, value, previousValue, children,
    }) => {
      if (status === statusTypes.removed) {
        return `Property '${parentKey}${key}' was ${status}`;
      }
      if (status === statusTypes.updated) {
        return `Property '${parentKey}${key}' was ${status}. From ${convertValue(
          previousValue,
        )} to ${convertValue(value)}`;
      }
      if (status === statusTypes.equal) {
        return plain(children, `${parentKey}${key}.`);
      }
      return `Property '${parentKey}${key}' was ${status} with value: ${convertValue(value)}`;
    });
  return result.join('\n');
};

const json = (filesDifference) => JSON.stringify(filesDifference, null, 2);

const getFormattedDifference = {
  stylish,
  plain,
  json,
};

export default (file1, file2, option = 'stylish') => getFormattedDifference[option](diff(file1, file2));
