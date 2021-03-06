import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import {store, history} from './store/store';
import App from './components/App.js';

import './index.css';
import { checkAuth } from './store/auth/slice';


// определить залогинены мы или нет
store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history = {history}>
      <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

