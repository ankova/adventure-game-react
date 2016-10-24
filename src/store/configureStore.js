import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

// Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production' ?
    [require('redux-immutable-state-invariant')(), promiseMiddleware, require('redux-logger')()] :
    [promiseMiddleware];

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, ...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}