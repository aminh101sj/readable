import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import 'antd/dist/antd.css';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger, thunk)
);

ReactDOM.render(<App store={ store }/>, document.getElementById('root'));
registerServiceWorker();
