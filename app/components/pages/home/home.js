'use strict';

var React = require('react');

var Input = require('./../../reusable/domElementWrappers/input');

var HomePage = React.createClass({
    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="home-page-container">
                            <div className="name-call-out">Jon Rubins</div>

                            <Input
                                className='general-search'
                                type='text'
                                placeholder='under construction...' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;
