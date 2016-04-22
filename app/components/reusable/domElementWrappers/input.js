'use strict';

var React = require('react');

var Input = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,

        className: React.PropTypes.string,
        placeholder: React.PropTypes.string
    },

    render: function() {
        return (
            <input
                className={this.props.className}
                type={this.props.type}
                placeholder={this.props.placeholder} />
        );
    }
});

module.exports = Input;
