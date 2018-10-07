/**
 * /controller/define/admin/general.js
 * @author John Kindem
 */

const controllerConfig = require('../../../config/controller');

const url = `${controllerConfig.commonUrlPrefix}/admin/general`;

/**
 * /admin/general 控制器定义
 */
module.exports = {
    url: url,
    get: function (connection, model) {
        return function (request, response) {
            // 获取参数
            // TODO
        }
    }
};