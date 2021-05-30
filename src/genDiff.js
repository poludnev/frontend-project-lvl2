import diff from './buildDiff.js';
import stylish from './formatters/stylishFormatter.js';
import plain from './formatters/plainFormatter.js';
import json from './formatters/jsonFormatter.js';

export default (file1, file2, option = 'stylish') => ({
  stylish,
  plain,
  json,
})[option](diff(file1, file2));
