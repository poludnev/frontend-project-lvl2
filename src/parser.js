import json from './parsers/jsonParser.js';
import yaml from './parsers/yamlParser.js';

const parsers = {
  json,
  yaml,
};

export default (data, format) => {
  const parse = parsers[format];
  return parse(data);
};
