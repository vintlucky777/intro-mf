// TODO: here I'll have generic `apiRequest()` method and some more request
// utils and handlers

import config from 'src/config';
import qs from 'query-string';
import store from 'src/store/store';

export function apiRequest(path, options = {}) {
  const currentState = store.getState();
  const {apiKey} = currentState.preferences;

  if (!apiKey) {
    return Promise.reject(new Error('API key not specified'));
  }

  const {query, ...otherOptions} = options;
  const fullQuery = {...query, apiKey: apiKey};

  const url = `${config.apiHost}${path}`
  const urlWithQuery = url + '?' + qs.stringify(fullQuery);

  return fetch(urlWithQuery, otherOptions).then(res => res.json());
}
