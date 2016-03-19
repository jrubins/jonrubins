'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Provider = require('react-redux').Provider;
var ReactRouter = require('react-router');
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;

var configureStore = require('./../app/store/configureStore');

var routes = require('./../app/routes');

module.exports = function(app) {
    // We use React Router to decide which component to show for which route.
    app.get('*', function(req, res) {
        match({routes, location: req.url}, function(error, redirectLocation, renderProps) {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                // Create our server store.
                var store = configureStore({});

                // Render our React components to a string that we insert into our Jade index template.
                var html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                // Get our final state.
                var storeState = store.getState();

                res.status(200).render('index', {
                    html: html,
                    state: storeState
                });
            } else {
                res.status(404).send('Not found');
            }
        });
    });
};
