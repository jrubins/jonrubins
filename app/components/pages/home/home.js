'use strict';

var React = require('react');

var HomePage = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>React Boilerplate</h1>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;
