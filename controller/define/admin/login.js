/**
 * /controller/define/admin/login.js
 * @author John Kindem
 */

const controllerConfig = require('../../../config/controller');
const Log = require('../../../tool/log');

const url = `${controllerConfig.commonUrlPrefix}/admin/login`;

/**
 * /admin/login 控制器定义
 */
module.exports = {
    url: url,
    get: function (connection, model) {
        return function (request, response) {
            // 获取参数
            const query = request.query || {};
            const username = query.username || {};

            // 查询 username 是否存在
            model.admin.one({
                username: username
            }, function (error, object) {
                // 如果查询出错
                if (error) {
                    Log.error('数据库查询错误', error);
                    return response.status(500).end();
                }
                // 如果存在
                if (object) {
                    return response.json({
                        salt: object.salt
                    });
                } else {
                    return response.json({
                        salt: null
                    });
                }
            });
        }
    }
};