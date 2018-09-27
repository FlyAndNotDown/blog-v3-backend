/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');

module.exports = {
    url: `${controllerConfig.commonUrlPrefix}/admin`,
    get: function(connection, model) {
        return function(req, res) {

        }
    }
};
