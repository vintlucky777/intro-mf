import {apiRequest} from 'src/utils/request';
import config from 'src/config';

// recommended config update interval is to check it once every few days.
// we'll make it once in 24 hours
const CONFIG_UPDATE_INTERVAL = 24*60*60*1000;

// Request API config, that contains image store paths, available sizes and more
export function getAPIConfig() {
  const {apiConfig, lastConfigUpdateAt} = config.get();
  const lastUpdatedAt = lastConfigUpdateAt
    ? new Date(lastConfigUpdateAt)
    : null;
  const now = new Date();

  // if the config is "fresh", give it out as it is
  if (now - lastUpdatedAt < CONFIG_UPDATE_INTERVAL) {
    return Promise.resolve(apiConfig);
  }

  return apiRequest('/3/configuration').then(newApiConfig => {
    config.setItem('apiConfig', newApiConfig);
    config.setItem('lastConfigUpdateAt', new Date().toISOString());

    // in case the user keeps the tab opened, schedule
    // app config refresh
    setTimeout(getAPIConfig, CONFIG_UPDATE_INTERVAL);
  });
};
