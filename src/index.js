import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/components/app';
import registerServiceWorker from 'src/register-service-worker';
import 'src/base-styles.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
