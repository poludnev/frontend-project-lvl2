import yaml from 'js-yaml';

const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
};

export default (data, dataType) => {
  if (!parsers.hasOwnProperty(dataType)) throw new Error('Unknown data typa');
  const parse = parsers[dataType];
  return parse(data);
};
