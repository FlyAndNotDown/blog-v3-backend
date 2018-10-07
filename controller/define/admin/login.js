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
            const username = query.username || null;

            // 参数校验
            if (!username) {
                Log.error('参数校验错误');
                return response.status(400).send('参数校验错误');
            }

            // 查询 username 是否存在
            model.admin.one({
                username: username
            }, (error, object) => {
                // 如果查询出错
                if (error) {
                    Log.error('数据库查询错误', error);
                    return response.status(500).send('数据库查询错误');
                }
                // 如果存在
                if (object) {
                    Log.log('正常返回');
                    return response.json({
                        salt: object.salt
                    });
                } else {
                    Log.log('正常返回');
                    return response.json({
                        salt: null
                    });
                }
            });
        }
    }
};