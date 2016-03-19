'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory;

var configureStore = require('./store/configureStore');
var routes = require('./routes');

ReactDOM.render(
    <Provider store={configureStore(window.__INITIAL_STATE__)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
, document.getElementById('app'));
