import nodeTypes from './nodeTypes.js';
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

const convertValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object' && value !== null) return '[complex value]';
  return value;
};

const stylish = (filesDifference, depth = 1, filler = '  ') => {
  const result = filesDifference.map(({
    key, status, value, previousValue, children,
  }) => {
    switch (status) {
      case nodeTypes.added:
        return `${filler.repeat(depth)}+ ${stringifyKeyValue(key, value, depth)}`;
      case nodeTypes.removed:
        return `${filler.repeat(depth)}- ${stringifyKeyValue(key, value, depth)}`;
      case nodeTypes.updated:
        return `${filler.repeat(depth)}- ${stringifyKeyValue(key, previousValue, depth)}\n${filler.repeat(
          depth,
        )}+ ${stringifyKeyValue(key, value, depth)}`;
      case nodeTypes.nested:
        return `${filler.repeat(depth)}  ${key}: ${stylish(children, depth + 2)}`;
      case nodeTypes.equal:
        return `${filler.repeat(depth)}  ${stringifyKeyValue(key, value, depth)}`;
      default:
        throw new Error('Unknown node type');
    }
  });
  return `{\n${result.join('\n')}\n${filler.repeat(depth - 1)}}`;
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

const json = (filesDifference) => JSON.stringify(filesDifference, null, 2);

export default (file1, file2, option = 'stylish') => ({
  stylish,
  plain,
  json,
})[option](diff(file1, file2));
