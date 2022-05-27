import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history"
import { Provider } from 'react-redux';
import { store } from './store';

export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history} >
      <Provider store={store}>

        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

