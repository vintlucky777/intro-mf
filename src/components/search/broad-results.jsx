import React from 'react';
import styles from './broad-results.css';
import MovieCard from 'src/components/movie-card';
import {pluralize} from 'src/utils/utils';

// BroadResults renders a list of fuzzy-searched short movie cards
// for the purposes of this small program, I won't implement pagination
class BroadResults extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  renderAmountMsg(className) {
  const {total_results, results} = this.props.data;
  const isShowingSubset = total_results > 0 && results.length < total_results;

    return (
      <div className={className}>
        {isShowingSubset
          ? `Showing ${results.length} of ${total_results} ${pluralize('result', total_results)}`
          : `Found ${total_results} ${pluralize('movie', total_results)}`}
      </div>
    );
  }

  render() {
    const {data} = this.props;
    const {results} = data;

    return (
      <div className={styles.block}>
        {this.renderAmountMsg(styles.totalTop)}
        <div className={styles.items}>
          {results.map(movie => <MovieCard key={movie.id} data={movie} />)}
        </div>
        {this.renderAmountMsg(styles.totalBottom)}
      </div>
    );
  }
}

export default BroadResults;
