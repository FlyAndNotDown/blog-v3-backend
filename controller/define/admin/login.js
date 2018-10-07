/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

const controllerConfig = require('../../../config/controller');

const url = `${controllerConfig.commonUrlPrefix}/admin/login`;

/**
 * /admin/login 控制器定义
 */
module.exports = {
    url: url,
    get: function (connection, model) {
        return function (request, response) {
            // TODO
        }
    }
};