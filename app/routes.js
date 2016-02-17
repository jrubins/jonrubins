'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var routes = (
    <Router>
        <Route path="/" component={require('./components/app')}>
            <IndexRoute component={require('./components/pages/home/home')} />
        </Route>
    </Router>
);

module.exports = routes;
