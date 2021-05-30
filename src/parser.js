import json from './parsers/jsonParser.js';
import yaml from './parsers/yamlParser.js';

export default (data, format) => ({
  json,
  yaml,
})[format](data);
