/**
 * /controller/define/post.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/post`,
    get: function(connection, model) {
        return function(req, res) {
            // TODO
            return res.send('hello');
        }
    },
    post: function(connection, model) {
        return function(req, res) {
            //TODO
        }
    },
    put: function(connection, model) {
        return function(req, res) {
            // TODO
        }
    },
    delete: function(connection, model) {
        return function(req, res) {
            // TODO
        }
    }
};
