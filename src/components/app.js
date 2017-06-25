import React, {Component} from 'react';
import Header from 'src/components/header';
import styles from './app.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
