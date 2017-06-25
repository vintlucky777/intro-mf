import React, {Component} from 'react';
import logo from 'src/logo.svg';
import styles from './header.css';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h2>Welcome to React</h2>
      </div>
    );
  }
}

export default Header;
