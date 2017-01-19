/**
 * Created by Nelson on 2016/11/28.
 */

import './static/css/index.less'
import React from 'react';
import { render } from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';
import App from './reducers/reducers';
import routes from './routes/router';

var initialState = window.__INITIAL_STATE__;

const store = createStore(App, initialState, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log('abc:',store.getState(),':',new Date().getTime())
});

console.log('client:',new Date().getTime());
render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.querySelector('#app')
)
