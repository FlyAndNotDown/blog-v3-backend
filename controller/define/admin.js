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
    url: url
};
