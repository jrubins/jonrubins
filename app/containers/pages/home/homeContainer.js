'use strict';

var connect = require('react-redux').connect;

var HomePage = require('./../../../components/pages/home/home');

var mapStateToProps = function() {
    return {};
};

var mapDispatchToProps = function() {
    return {};
};

var HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

module.exports = HomeContainer;
