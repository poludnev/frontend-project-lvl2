import stylish from './stylishFormatter.js';
import plain from './plainFormatter.js';
import json from './jsonFormatter.js';

const formatters = {
  stylish,
  plain,
  json,
}

export const formate = (tree, formatName) => {
  const formatter = formatters[formatName];
  return formatter(tree);

};