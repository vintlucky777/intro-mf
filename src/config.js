import _ from 'lodash';

const defaultConfig = {
  apiHost: 'https://api.themoviedb.org',
};

const STORAGE_KEY = 'appConfig';

const storedConfig = JSON.parse(localStorage.getItem(STORAGE_KEY));

let config = {
  ...defaultConfig,
  ...storedConfig,
};

function get() {
  return config;
}

function set(nextConfig) {
  config = _.cloneDeep(nextConfig); // make a copy here
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

  return config;
}

function setItem(key, value) {
  const nextConfig = {...config, [key]: value};

  set(nextConfig);

  return value;
}

export default {get, set, setItem};
