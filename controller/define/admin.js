/**
 * /controller/define/admin.js
 * @author John Kindem
 */

const controllerConfig = require('../../config/controller');
const HttpError = require('../../tool/http-error');
const settings = require('../../settings');
const Log = require('../../tool/log');
const regexConfig = require('../../config/regex');

const url = `${controllerConfig.commonUrlPrefix}/admin`;

module.exports = {
    url: url,
    /**
     * 获取盐
     * @param  {object} connection 数据库连接
     * @param  {object} model      数据库模型
     * @return {function}          处理函数
     */
    get: function(connection, model) {
        return function(req, res) {
            // 服务器日志
            Log.log(`get ${url}`);
            // 参数获取
            // TODO
        }
    },
    /**
     * 登录校验
     * @param  {object} connection 数据库连接
     * @param  {object} model      数据库模型
     */
    post: function(connection, model) {
        return function(req, res) {
            // TODO
        }
    }
};
