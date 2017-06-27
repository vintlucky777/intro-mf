import config from 'src/config';
import qs from 'query-string';

/**
 * a generic method to perform a API call given a specific REST path
 */
export function apiRequest(path, options = {}) {
  const {apiHost, apiKey} = config.get();

  const {query, ...otherOptions} = options;
  const fullQuery = {...query, api_key: apiKey};

  const url = `${apiHost}${path}`
  const urlWithQuery = url + '?' + qs.stringify(fullQuery);

  return fetch(urlWithQuery, otherOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    });
}
