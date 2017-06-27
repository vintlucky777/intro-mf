import _ from 'lodash';
import {apiRequest} from 'src/utils/request';

// Broad search movies given a text query
export function searchMoviesByName(name, options = {}) {
  return apiRequest('/3/search/movie', {
    method: 'GET',
    query: {
      language: navigator.languages[0],
      query: name,
      include_adult: options.includeAdult,
      page: options.page,
    }
  });
};

// Find a movie by exact id
export function getMovieById(id, options = {}) {
  // if it's not a number, return null
  if (_.isNaN(parseInt(id, 10))) {
    return Promise.resolve(null);
  }

  const isIncludeAdult = options.includeAdult;
  const filterResults = response => {
    if (!isIncludeAdult && response.adult) {
      return null;
    } else {
      return {...response, match: 'tmdb_id'};
    }
  };

  return apiRequest(`/3/movie/${id}`).then(filterResults).catch(() => null);
};

// Find a movie by IMDB id
export function findMovieByIMDBId(imdbId, options = {}) {
  // we suggest that IMDB movies have a specific format `/^tt\d+$/`
  // like these:
  // tt1246124
  // tt6938928
  if (!imdbId || !imdbId.match(/^tt\d+$/)) {
    return null;
  }

  const isIncludeAdult = options.includeAdult;
  const filterResults = response => {
    let exactMovie = null;

    if (!isIncludeAdult) {
      const results = _.get(response, 'movie_results', [])
      const filteredResults = results.filter(movie => !movie.adult);
      exactMovie = _.first(filteredResults) || null;
    } else {
      exactMovie = _.get(response, 'movie_results[0]', null);
    }

    // here we enrich the found movie with auxillary data `imdb_id` field
    return exactMovie ? {...exactMovie, match: 'imdb_id', imdb_id: imdbId} : null;
  };

  return apiRequest(`/3/find/${imdbId}`, {
    method: 'GET',
    query: {
      language: navigator.languages[0],
      external_source: 'imdb_id',
    }
  }).then(filterResults);
};

// Search for movies given user input. Don't judge, what the user typed in,
// just try to use it either as TMDBid, IMDBid or text and simply do several
// requests in parallel.
export function searchMovies(nameOrId, options = {}) {
  return Promise.all([
    getMovieById(nameOrId, options),
    findMovieByIMDBId(nameOrId, options),
    searchMoviesByName(nameOrId, options),
  ]).then(([exactResult, exactIMDBResult, broadResults]) => {
    return {
      exactResult: exactResult || exactIMDBResult,
      broadResults,
    };
  })
}
