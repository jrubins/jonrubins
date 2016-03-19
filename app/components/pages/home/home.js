'use strict';

var React = require('react');

var Logo = require('./../../reusable/logos/logo');
var SiteMotto = require('./../../reusable/logos/siteMotto');

var HomePage = React.createClass({
    propTypes: {
        syncAction: React.PropTypes.func.isRequired,
        motto: React.PropTypes.string.isRequired
    },

    componentDidMount: function() {
        // Trigger some sample action when we mount.
        this.props.syncAction();
    },

    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="home-page-container">
                            <Logo />

                            <h1>React Boilerplate</h1>

                            <SiteMotto
                                motto={this.props.motto} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;
