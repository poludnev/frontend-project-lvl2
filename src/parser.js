import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, dataType) => {
  if (!_.has(parsers, dataType)) throw new Error(`Unsupported data type: ${dataType}`);
  const parse = parsers[dataType];
  return parse(data);
};
