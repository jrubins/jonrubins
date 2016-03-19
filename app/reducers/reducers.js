'use strict';

var _ = require('lodash');
var combineReducers = require('redux').combineReducers;

function app(state, action) {
    if (_.isUndefined(state)) {
        return {
            motto: 'This is a great boilerplate project!'
        };
    }

    switch (action.type) {
        default:
            return state;
    }
}

var reducers = combineReducers({
    app: app
});

module.exports = reducers;
