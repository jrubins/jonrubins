'use strict';

var React = require('react');

var Logo = React.createClass({
    render: function() {
        return (
            <div className="logo-container">
                <img className="logo-img" src="/images/logo.jpg" />
            </div>
        );
    }
});

module.exports = Logo;
