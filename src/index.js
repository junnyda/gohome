import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import ScrollToTop from 'ScrollToTop';
import 'assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

root.render(
  <BrowserRouter>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <ScrollToTop />
      <App />
    </Provider>
  </BrowserRouter>
);
