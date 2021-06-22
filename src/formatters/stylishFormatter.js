import { nodeTypes } from '../buildDiff.js';

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
export default stylish;
