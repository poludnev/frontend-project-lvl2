import yaml from 'js-yaml';

const dataTypes = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
};

const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
};

const getDataType = (fileExtension, dataTypesList) => {
  if (!dataTypesList[fileExtension]) throw new Error('Unknown file extension');
  return dataTypesList[fileExtension];
};

export default (data, extension) => {
  const dataType = getDataType(extension, dataTypes);
  const parse = parsers[dataType];
  return parse(data);
};
