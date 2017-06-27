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

    this.state = {
      config: config,
    }

    if (storedConfig.apiKey) {
      getAPIConfig().then(
        () => this.setState({config: config.get()}),
        () => {},
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
