import stylish from './stylishFormatter.js';
import plain from './plainFormatter.js';
import json from './jsonFormatter.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (tree, formatName) => {
  const format = formatters[formatName];
  if (!format) throw new Error(`Unsupported output format: ${formatName}`);
  return format(tree);
};
