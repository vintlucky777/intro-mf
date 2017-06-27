import React, {PropTypes} from 'react';
import styles from './form.css';

class SearchForm extends React.Component {
  static propTypes = {
    defaultValues: PropTypes.object,
    onSubmit: PropTypes.func,
    onInputChange: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: (...args) => {console.warn('this.props.onSubmit()', args)},
    onInputChange: (...args) => {console.warn('this.props.onInputChange()', args)},
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      form: {
        include_adult: false,
        search_query: '',
        api_key: '',
        ...props.defaultValues,
      },
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.state.form);
  }

  handleInputChange(ev) {
    const {name, value, type, checked} = ev.target;
    const nextValue = type === 'checkbox'
      ? checked
      : value;

    const nextForm = {
      ...this.state.form,
      [name]: nextValue,
    };

    this.setState({form: nextForm});
    this.props.onInputChange(nextForm);
  }

  render() {
    const {form: formValues} = this.state;

    return (
      <form
        name='movie_search'
        onSubmit={this.handleSubmit}
        className={styles.form}
      >
        <div className={styles.primary}>
          <input
            className={styles.primaryInput}
            name='search_query'
            placeholder='Search for movie keywords or IMDB-id'
            value={formValues.search_query}
            onChange={this.handleInputChange}
            onInput={this.handleInputChange}
          />
          <span
            className={styles.primaryInputIcon}
            role='img'
            aria-label='magnifying-glass'
          >
            🔍
          </span>
        </div>
        <div className={styles.auxillary}>
          <label className={styles.inputApiKey}>
            <span>API key</span>
            <input
              name='api_key'
              placeholder='your moviedb API key'
              required={true}
              value={formValues.api_key}
              onChange={this.handleInputChange}
              onInput={this.handleInputChange}
            />
          </label>
          <label className={styles.inputAdultContent}>
            <input
              type='checkbox'
              name='include_adult'
              value={formValues.include_adult}
              onChange={this.handleInputChange}
            />
            Include adult content?
          </label>
        </div>
        <button type='submit' style={{display: 'none'}} name='submit'/>
      </form>
    );
  }
}

export default SearchForm;
