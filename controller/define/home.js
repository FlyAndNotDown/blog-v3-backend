/**
 * /controller/define/home.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/home`,
    get: function(connection, model) {
        return function(req, res) {}
    },
    post: function(connection, model) {
        return function(req, res) {}
    },
    put: function(connection, model) {
        return function(req, res) {}
    },
    delete: function(connection, model) {
        return function(req, res) {}
    }
};
