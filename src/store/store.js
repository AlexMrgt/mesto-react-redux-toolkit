import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import mestoApi from '../utils/mesto-api';
import authApi from '../utils/auth-api';
import authReducer, { sliceName as authSliceName } from './auth/slice';
import userReducer, { sliceName as userSliceName } from './current-user/slice';
import cardsReducer, { sliceName as cardsSliceName } from './cards/slice';

const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    [authSliceName]: authReducer,
    [userSliceName]: userReducer,
    [cardsSliceName]: cardsReducer,
    router: connectRouter(history),
  },
  middleware: [
    thunk.withExtraArgument({ authApi, mestoApi }),
    routerMiddleware(history),
  ]
});

export {
  store,
  history,
}
