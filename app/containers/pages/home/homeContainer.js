'use strict';

var connect = require('react-redux').connect;

var ActionTemplate = require('./../../../actions/actionTemplate');

var HomePage = require('./../../../components/pages/home/home');

var mapStateToProps = function(state) {
    return {
        motto: state.app.motto
    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        syncAction: function() {
            console.log('Dispatching a synchronous action...');

            dispatch(ActionTemplate.syncAction());
        }
    };
};

var HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

module.exports = HomeContainer;
