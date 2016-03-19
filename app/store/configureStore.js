'use strict';

var Redux = require('redux');
var createStore = Redux.createStore;
var applyMiddleware = Redux.applyMiddleware;
var compose = Redux.compose;
var ReduxThunk = require('redux-thunk').default;

var reducers = require('./../reducers/reducers');

// Create our function to set up the store.
module.exports = function(initialState) {
    return createStore(reducers, initialState, compose(
        // Allows us to use asynchronous actions.
        applyMiddleware(ReduxThunk),

        // Enables the Chrome Redux dev tools extension. It's awesome.
        (typeof window === 'object' &&
            typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
    ));
};
