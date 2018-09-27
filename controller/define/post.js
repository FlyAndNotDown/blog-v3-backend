/**
 * /controller/define/post.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/post`,
    get: function(connection, model) {
        return function(req, res) {}
    },
};
