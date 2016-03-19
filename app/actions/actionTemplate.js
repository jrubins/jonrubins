'use strict';

var ActionTypes = require('./../constants/actionTypes');

var ActionTemplate = {
    /**
     * An example of a synchronous action.
     *
     * @return {Object}
     */
    syncAction: function() {
        return {
            type: ActionTypes.ACTION_SYNC
        };
    },

    /**
     * An example of an asynchronous action using Redux Thunk.
     *
     * @return {Function}
     */
    asyncAction: function() {
        return function(dispatch) {
            setTimeout(function() {
                dispatch({
                    type: ActionTypes.ACTION_ASYNC
                });
            }, 500);
        };
    }
};

module.exports = ActionTemplate;
