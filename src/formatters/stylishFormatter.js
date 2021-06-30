import { nodeTypes } from '../buildDiff.js';

const makeFiller = (depth, fillerType = '  ') => fillerType.repeat(depth);

const stringifyObject = (obj, depth = 1) => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    if (value instanceof Object) {
      return `${makeFiller(depth + 2)}${key}: ${stringifyObject(value, depth + 2)}`;
    }
    if (`${value}`.length === 0) return `${makeFiller(depth + 1)}${key}: `;
    return `${makeFiller(depth + 2)}${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${makeFiller(depth)}}`;
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

const stylish = (filesDifference, depth = 1) => {
  const basicFiller = makeFiller(depth);
  const result = filesDifference.map(({
    key, status, value1, value2, children,
  }) => {
    switch (status) {
      case nodeTypes.added:
        return `${basicFiller}+ ${stringifyKeyValue(key, value1, depth)}`;
      case nodeTypes.removed:
        return `${basicFiller}- ${stringifyKeyValue(key, value1, depth)}`;
      case nodeTypes.updated:
        return `${basicFiller}- ${stringifyKeyValue(key, value2, depth)}\n${basicFiller}+ ${stringifyKeyValue(key, value1, depth)}`;
      case nodeTypes.nested:
        return `${basicFiller}  ${key}: ${stylish(children, depth + 2)}`;
      case nodeTypes.equal:
        return `${basicFiller}  ${stringifyKeyValue(key, value1, depth)}`;
      default:
        throw new Error(`Unknown node type: ${status}`);
    }
  });
  return `{\n${result.join('\n')}\n${makeFiller(depth - 1)}}`;
};
export default stylish;
