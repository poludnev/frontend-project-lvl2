import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
};

export default (data, dataType) => {
  if (!_.has(parsers, dataType)) throw new Error('Unknown data typa');
  const parse = parsers[dataType];
  return parse(data);
};
