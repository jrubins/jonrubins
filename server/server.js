'use strict';

// Transforms our JSX and ES2015 modules at runtime when it encounters them.
require('babel-register');

var express = require('express');

var config = require('./../config/buildConfig');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(config.paths.dist));

require('./routeHandlers')(app);

app.listen(config.serverPort, function() {
    console.log('Server listening on port ' + config.serverPort + '...');
});
