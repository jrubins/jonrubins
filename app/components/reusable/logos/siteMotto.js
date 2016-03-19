'use strict';

var React = require('react');

var SiteMotto = React.createClass({
    propTypes: {
        motto: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <div className="motto-container">
                {'Motto: ' + this.props.motto}
            </div>
        );
    }
});

module.exports = SiteMotto;
