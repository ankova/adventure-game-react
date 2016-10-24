import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';
const store = configureStore();
const rootEl = document.getElementById('mainContent');

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    rootEl
);
