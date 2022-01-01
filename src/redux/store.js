import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore} from "redux-persist";

let Middleware;
let ReduxDevTool;

if (process.env.NODE_ENV === 'production') {
  Middleware = applyMiddleware(thunk);
} else {
  Middleware = applyMiddleware(thunk, logger);
  ReduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(rootReducer, ReduxDevTool, Middleware);

const persistor = persistStore(store);

export { store, persistor };
