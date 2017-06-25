import _ from 'lodash';
import {apiRequest} from 'src/utils/request';
import {store} from 'src/store/store';

export function searchMoviesByName(name, options = {}) {
  const userPreferences = store.getState().preferences;

  return apiRequest('/3/search/movie', {
    method: 'GET',
    query: {
      language: navigator.languages,
      query: name,
      include_adult: userPreferences.includeAdult,
      page: options.page,
    }
  });
};

export function findMovieById(imdbId) {
  const userPreferences = store.getState().userPreferences;
  const isIncludeAdult = userPreferences.includeAdult;

  return apiRequest(`/3/find/${imdbId}`, {
    method: 'GET',
    query: {
      language: navigator.languages,
      external_source: 'imdb_id',
    }
  }).then(response => {
    if (!isIncludeAdult) {
      return _(response)
        .get('movie_results', [])
        .filter(movie => !movie.adult)
        .valueOf();
    }

    return _(response).get('movie_results[0]', null);
  });
};

export default {
  searchMoviesByName,
  findMovieById,
};
