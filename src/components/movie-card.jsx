import React from 'react';
import cs from 'classnames';
import styles from './movie-card.css';
import Poster from 'src/components/movie-poster';
import {pluralize} from 'src/utils/utils';

class MovieCard extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  renderDetailed() {
    const {data} = this.props;
    const {title, id, imdb_id, overview, poster_path, release_date, vote_average, vote_count} = data;
    const releaseYear = new Date(release_date).getFullYear();
    console.log(data)

    return (
      <div className={cs(styles.card, styles.cardDetailed)}>
        <Poster
          posterPath={poster_path}
          width={300}
          alt='movie poster'
          className={styles.poster}
          emptyClassName={styles.posterEmpty}
        />
        <div className={styles.info}>
          <span className={styles.id}>IMDB: {imdb_id}, TMDB: {id}</span>
          <h2 className={styles.title}>{title}</h2>
          {releaseYear && <p className={styles.releaseYear}>Released: {releaseYear}</p>}
          <span className={styles.rating}>
            Rating: {vote_average} ({vote_count} {pluralize('vote', vote_count)})
          </span>
          <h3 className={styles.synopsisTitle}>Synopsis:</h3>
          <p className={styles.description}>{overview}</p>
        </div>
      </div>
    );
  }

  renderDefault() {
    const {data} = this.props;
    const {title, poster_path, id, overview, vote_average, vote_count} = data;

    return (
      <div className={styles.card}>
        <Poster
          posterPath={poster_path}
          alt='movie poster'
          width={100}
          className={styles.poster}
          emptyClassName={styles.posterEmpty}
        />
        <div className={styles.info}>
          <span className={styles.id}>id: {id}</span>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.rating}>
            Rating: {vote_average} ({vote_count} {pluralize('vote', vote_count)})
          </span>
          <p className={styles.descriptionNarrow}>{overview}</p>
        </div>
      </div>
    );
  }

  render() {
    const {format} = this.props;

    switch (format) {
      case 'detailed':
        return this.renderDetailed();
      default:
        return this.renderDefault();
    }
  }
}

export default MovieCard;
