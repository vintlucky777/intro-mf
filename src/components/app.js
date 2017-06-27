import React, {Component} from 'react';
import SearchBlock from 'src/components/search/block';
import config from 'src/config';
import styles from './app.css';
import {getAPIConfig} from 'src/api/configuration';

class App extends Component {
  state = {
    apiKey: null,
  }

  constructor(props) {
    super(props);

    const storedConfig = config.get();

    // attempt to refresh config on app start,
    // if there is a stored config apikey.
    if (storedConfig.apiKey) {
      getAPIConfig().then(
        () => {
          // config received, yeah!
        },
        () => {
          // the stored API key may be incorrect. or a network died.
          // ignore the error
        },
      );
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <h1 className={styles.appTitle}>The movie search</h1>
        <div className={styles.searchBlock}>
          <SearchBlock />
        </div>
      </div>
    );
  }
}

export default App;
