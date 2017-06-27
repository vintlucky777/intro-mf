import React from 'react';
import _ from 'lodash';
import cs from 'classnames';

import * as api from 'src/api/movies';
import {getAPIConfig} from 'src/api/configuration';
import SearchForm from './form';
import BroadResults from './broad-results';
import MovieCard from 'src/components/movie-card';
import config from 'src/config';
import styles from './block.css';

const INPUT_DEBOUNCE_INTERVAL = 400;

class SearchBlock extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.searchMovies = this.searchMovies.bind(this);

    this.state = {
      form: {
        api_key: config.get().apiKey,
      },
      loading: false,
      error: null,
      broadResults: null,
      exactMatch: null,
    };
  }

  handleFormChange(form) {
    const {form: prevForm} = this.state;

    if (prevForm.api_key !== form.api_key) {
      config.setItem('apiKey', form.api_key);

      if (form.api_key) {
        getAPIConfig().catch(error => this.setState({error}));
      }
    }

    this.setState({form});

    if (form.search_query) {
      this.debouncedSearchMovies(form);
    } else {
      this.debouncedSearchMovies.cancel();
      this.setState({
        loading: false,
        error: null,
        exactResult: null,
        broadResults: null,
      });
    }
  }

  searchMovies(criteria) {
    const {
      search_query: nameOrId,
      include_adult: includeAdult,
    } = criteria;

    this.setState({loading: true});

    api.searchMovies(nameOrId, {includeAdult})
      .then(({exactResult, broadResults}) => {
        this.setState({
          loading: false,
          error: null,
          exactResult,
          broadResults,
        });
      }).catch(error => this.setState({loading: false, error}));
  }

  debouncedSearchMovies = _.debounce(
    (criteria) => this.searchMovies(criteria),
    INPUT_DEBOUNCE_INTERVAL,
  );

  renderExactResult() {
    const {exactResult} = this.state;

    if (!exactResult) {
      return null;
    }

    return (
      <div>
        <div className={styles.exactMatchHint}>Exact match</div>
        <MovieCard format='detailed' data={exactResult} />
      </div>
    );
  }

  renderBroadResults() {
    const {broadResults, exactResult} = this.state;

    if (!broadResults || exactResult) {
      return null;
    }

    return <BroadResults data={broadResults} />;
  }

  render() {
    const {loading, error} = this.state;

    return (
      <div className={styles.block}>
        <SearchForm
          className={styles.searchForm}
          defaultValues={this.state.form}
          onInputChange={this.handleFormChange}
          onSubmit={this.handleFormChange}
        />
        <div className={cs(styles.results, loading && styles.resultsLoading)}>
          {loading && <span className={styles.loader}/>}
          {error && <span className={styles.error}>Error: {error.message}</span>}
          {this.renderExactResult()}
          {this.renderBroadResults()}
        </div>
      </div>
    );
  }
}

export default SearchBlock;
