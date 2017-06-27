import React from 'react';
import cs from 'classnames';
import _ from 'lodash';
import config from 'src/config';

class MoviePoster extends React.Component {
  // `getPosterSize()` selects the best suitable movie poster width.
  // the complex part here is picking from available downscaled image sizes
  // in order to transfer less data and satisfy quality for desired poster width
  // TODO: memoizing this function would greatly speed up performance
  //       but flushing memoize chache could be a pain
  // TODO: sizes are pretty general API-wide, so maybe this function belongs
  //       to somewhere around `src/utils`
  getPosterSize(width) {
    const {apiConfig} = config.get();
    const imagesConfig = apiConfig.images;
    const availableSizes = imagesConfig.poster_sizes;
    const desiredWidth = width * window.devicePixelRatio;
    const suitableWidth = _(availableSizes)
      .filter(sz => sz.match(/^w\d+$/))
      .map(sz => parseInt(sz.slice(1), 10))
      .filter(sz => sz <= desiredWidth)
      .max();

    let posterSize = suitableWidth ? `w${suitableWidth}` : 'original';

    return posterSize;
  }

  memoizedGetPosterSize = _.memoize(this.getPosterSize);

  getPosterUrl() {
    const {width, posterPath} = this.props;
    const {apiConfig} = config.get();
    const imagesConfig = apiConfig.images;
    const baseUrl = imagesConfig.secure_base_url || imagesConfig.base_url;
    // const posterSize = this.getPosterSize(width);
    const posterSize = this.memoizedGetPosterSize(width);

    return `${baseUrl}${posterSize}${posterPath}`;
  }

  render() {
    const {
      width,
      height,
      posterPath,
      alt = 'image',
      className,
      emptyClassName,
      ...props
    } = this.props;

    if (!posterPath) {
      return <span
        className={cs(className, emptyClassName)}
        style={{width, height}}
      >
        No image
      </span>;
    }

    return (
      <img
        {...props}
        className={className}
        alt={alt}
        width={width}
        height={height}
        src={this.getPosterUrl()}
      />
    );
  }
}

export default MoviePoster;
