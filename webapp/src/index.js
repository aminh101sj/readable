import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import 'antd/dist/antd.css';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);

ReactDOM.render(<App store={ store }/>, document.getElementById('root'));
registerServiceWorker();
