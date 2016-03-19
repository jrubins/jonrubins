'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var routes = (
    <Route path="/" component={require('./components/app')}>
        <IndexRoute component={require('./containers/pages/home/homeContainer')} />
    </Route>
);

module.exports = routes;
