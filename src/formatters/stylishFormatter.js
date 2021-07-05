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

const stringifyValue = (value, depth) => {
  if (value instanceof Array) {
    return `[${value.join(', ')}]`;
  }
  if (value instanceof Object) {
    return `${stringifyObject(value, depth + 1)}`;
  }
  return `${value}`;
};

const stylish = (filesDifference, depth = 1) => {
  const basicFiller = makeFiller(depth);
  const result = filesDifference.map(({
    key, status, value1, value2, children,
  }) => {
    switch (status) {
      case nodeTypes.added:
        return `${basicFiller}+ ${key}: ${stringifyValue(value1, depth)}`;
      case nodeTypes.removed:
        return `${basicFiller}- ${key}: ${stringifyValue(value1, depth)}`;
      case nodeTypes.updated:
        return `${basicFiller}- ${key}: ${stringifyValue(value2, depth)}\n${basicFiller}+ ${key}: ${stringifyValue(value1, depth)}`;
      case nodeTypes.nested:
        return `${basicFiller}  ${key}: ${stylish(children, depth + 2)}`;
      case nodeTypes.equal:
        return `${basicFiller}  ${key}: ${stringifyValue(value1, depth)}`;
      default:
        throw new Error(`Unknown node type: ${status}`);
    }
  });
  return `{\n${result.join('\n')}\n${makeFiller(depth - 1)}}`;
};
export default (filesDifference) => stylish(filesDifference);
