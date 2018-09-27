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
    // 获取盐
    get: function(connection, model) {
        return function(req, res) {
            // TODO
        }
    },
    // 登录校验
    post: function(connection, model) {
        return function(req, res) {
            // TODO
        }
    }
};
