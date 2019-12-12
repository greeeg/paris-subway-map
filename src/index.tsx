import React from 'react';
import { render } from 'react-dom';
import { Reset } from 'styled-reset';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const Root: React.FC = () => (
  <div>
    <Reset />
    <App />
  </div>
);

render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
