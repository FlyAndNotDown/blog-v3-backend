/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const Log = require('../../tool/log');

const url = `${controllerConfig.commonUrlPrefix}/admin`;

/**
 * /admin 控制器定义
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
